import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchDto } from './dto/search.dto';
import { AutocompleteDto } from './dto/autocomplete.dto';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(searchDto: SearchDto) {
    const {
      query,
      specialty,
      city,
      gender,
      specialityId,
      serviceId,
      medicalCode,
      clinicName,
      page = 1,
      limit = 5,
      type = 'all',
    } = searchDto;

    const skip = (page - 1) * limit;
    const take = limit;

    // Specialty mapping for search
    const specialtyMap = {
      1: 'General Practice',
      2: 'Cardiology',
      3: 'Dermatology',
      4: 'Pediatrics',
      5: 'Obstetrics & Gynecology',
      6: 'Orthopedics',
      7: 'Neurology',
      8: 'Psychiatry',
      9: 'Ophthalmology',
      10: 'ENT (Ear, Nose, Throat)',
      11: 'Gastroenterology',
      12: 'Urology',
      13: 'Endocrinology',
      14: 'Rheumatology',
      15: 'Oncology',
      16: 'Nephrology',
      17: 'Pulmonology',
      18: 'Hematology',
      19: 'Infectious Diseases',
      20: 'Emergency Medicine',
      21: 'Dentistry',
    };

    let results = {
      doctors: [],
      clinics: [],
      specialties: [],
    };

    let totalCount = 0;

    // Search doctors
    if (type === 'all' || type === 'doctors') {
      const doctorWhere: any = {};

      // Build doctor search conditions
      if (query) {
        doctorWhere.OR = [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { medicalCode: { contains: query } },
        ];
      }

      if (gender) {
        doctorWhere.gender = gender;
      }

      if (specialityId) {
        doctorWhere.specialityId = specialityId;
      }

      if (serviceId) {
        doctorWhere.serviceId = serviceId;
      }

      if (medicalCode) {
        doctorWhere.medicalCode = { contains: medicalCode };
      }

      // Search by specialty name
      if (specialty) {
        const specialtyIds = Object.entries(specialtyMap)
          .filter(([id, name]) =>
            name.toLowerCase().includes(specialty.toLowerCase()),
          )
          .map(([id]) => parseInt(id));

        if (specialtyIds.length > 0) {
          doctorWhere.specialityId = { in: specialtyIds };
        }
      }

      // If query is provided, also search by specialty name
      if (query && !specialityId) {
        const specialtyIdsFromQuery = Object.entries(specialtyMap)
          .filter(([id, name]) =>
            name.toLowerCase().includes(query.toLowerCase()),
          )
          .map(([id]) => parseInt(id));

        if (specialtyIdsFromQuery.length > 0) {
          if (doctorWhere.OR) {
            doctorWhere.OR.push({
              specialityId: { in: specialtyIdsFromQuery },
            });
          } else {
            doctorWhere.OR = [{ specialityId: { in: specialtyIdsFromQuery } }];
          }
        }
      }

      const doctors = await this.prisma.doctor.findMany({
        where: doctorWhere,
        include: {
          addresses: true,
          reviews: true,
          appointments: true,
          clinicDoctors: {
            include: {
              clinic: true,
            },
          },
        },
        skip,
        take,
        orderBy: {
          firstName: 'asc',
        },
      });

      // Filter by city if provided
      let filteredDoctors = doctors;
      if (city) {
        filteredDoctors = doctors.filter((doctor) =>
          doctor.addresses.some(
            (address) =>
              address.country === 'Malaysia' &&
              (address.addressLine1
                ?.toLowerCase()
                .includes(city.toLowerCase()) ||
                address.addressLine2
                  ?.toLowerCase()
                  .includes(city.toLowerCase())),
          ),
        );
      }

      // Map comprehensive doctor information
      results.doctors = filteredDoctors.map((doctor) => {
        // Get primary address
        const primaryAddress =
          doctor.addresses.find((addr) => addr.isPrimary) ||
          doctor.addresses[0];

        // Get associated clinics
        const clinics = doctor.clinicDoctors.map((cd) => ({
          id: cd.clinic.id,
          name: cd.clinic.name,
          address: cd.clinic.address,
          phone: cd.clinic.phone,
          description: cd.clinic.description,
          website: cd.clinic.website,
        }));

        return {
          id: doctor.id,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          fullName: `${doctor.firstName} ${doctor.lastName}`,
          gender: doctor.gender,
          email: doctor.email,
          phone: doctor.phone,
          profileImg: doctor.profileImg,
          medicalCode: doctor.medicalCode,
          specialityId: doctor.specialityId,
          specialtyName:
            specialtyMap[doctor.specialityId] || 'Unknown Specialty',
          averageRating: doctor.averageRating,
          totalRatings: doctor.totalRatings,
          clickCount: doctor.clickCount,
          isLiked: doctor.isLiked,

          // Address information
          address: primaryAddress
            ? {
                addressLine1: primaryAddress.addressLine1,
                addressLine2: primaryAddress.addressLine2,
                cityId: primaryAddress.cityId,
                zipcode: primaryAddress.zipcode,
                country: primaryAddress.country,
                latitude: primaryAddress.latitude,
                longitude: primaryAddress.longitude,
                isPrimary: primaryAddress.isPrimary,
              }
            : null,

          // Associated clinics
          clinics: clinics,

          // Reviews summary
          reviews: {
            count: doctor.reviews.length,
            averageRating: doctor.averageRating,
          },

          // Additional metadata
          createdAt: doctor.createdAt,
        };
      });

      totalCount += filteredDoctors.length;
    }

    // Search clinics
    if (type === 'all' || type === 'clinics') {
      const clinicWhere: any = {};

      if (query) {
        clinicWhere.OR = [
          { name: { contains: query } },
          { description: { contains: query } },
          { address: { contains: query } },
        ];
      }

      if (clinicName) {
        clinicWhere.name = { contains: clinicName };
      }

      const clinics = await this.prisma.clinic.findMany({
        where: clinicWhere,
        include: {
          clinicDoctors: {
            include: {
              doctor: {
                include: {
                  addresses: true,
                },
              },
            },
          },
          appointments: true,
        },
        skip,
        take,
        orderBy: {
          name: 'asc',
        },
      });

      // Filter clinics by specialty if query or specialty is provided
      let filteredClinics = clinics;
      if (query || specialty) {
        const searchTerm = query || specialty;
        const specialtyIds = Object.entries(specialtyMap)
          .filter(([id, name]) =>
            name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map(([id]) => parseInt(id));

        if (specialtyIds.length > 0) {
          filteredClinics = clinics.filter((clinic) =>
            clinic.clinicDoctors.some((clinicDoctor) =>
              specialtyIds.includes(clinicDoctor.doctor.specialityId),
            ),
          );
        }
      }

      // Filter by city if provided
      if (city) {
        filteredClinics = filteredClinics.filter(
          (clinic) =>
            clinic.address?.toLowerCase().includes(city.toLowerCase()) ||
            clinic.clinicDoctors.some((clinicDoctor) =>
              clinicDoctor.doctor.addresses.some(
                (address) =>
                  address.country === 'Malaysia' &&
                  (address.addressLine1
                    ?.toLowerCase()
                    .includes(city.toLowerCase()) ||
                    address.addressLine2
                      ?.toLowerCase()
                      .includes(city.toLowerCase())),
              ),
            ),
        );
      }

      // Map comprehensive clinic information
      results.clinics = filteredClinics.map((clinic) => {
        // Get associated doctors with their specialties
        const doctors = clinic.clinicDoctors.map((cd) => ({
          id: cd.doctor.id,
          firstName: cd.doctor.firstName,
          lastName: cd.doctor.lastName,
          fullName: `${cd.doctor.firstName} ${cd.doctor.lastName}`,
          specialityId: cd.doctor.specialityId,
          specialtyName:
            specialtyMap[cd.doctor.specialityId] || 'Unknown Specialty',
          medicalCode: cd.doctor.medicalCode,
          averageRating: cd.doctor.averageRating,
          addresses: cd.doctor.addresses,
        }));

        // Get unique specialties offered at this clinic
        const specialties = [
          ...new Set(
            doctors.map(
              (doctor) =>
                specialtyMap[doctor.specialityId] || 'Unknown Specialty',
            ),
          ),
        ];

        return {
          id: clinic.id,
          name: clinic.name,
          email: clinic.email,
          phone: clinic.phone,
          address: clinic.address,
          description: clinic.description,
          website: clinic.website,
          logo: clinic.logo,
          isVerified: clinic.isVerified,

          // Associated doctors
          doctors: doctors,

          // Available specialties
          specialties: specialties,

          // Appointments summary
          appointments: {
            count: clinic.appointments.length,
          },

          // Additional metadata
          createdAt: clinic.createdAt,
          updatedAt: clinic.updatedAt,
        };
      });
      totalCount += filteredClinics.length;
    }

    // Search specialties
    if (type === 'all' || type === 'specialties') {
      let specialties = Object.entries(specialtyMap).map(([id, name]) => ({
        id: parseInt(id),
        name,
      }));

      // Filter specialties by query
      if (query) {
        specialties = specialties.filter((specialty) =>
          specialty.name.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Filter by specialty name if provided
      if (specialty) {
        specialties = specialties.filter((s) =>
          s.name.toLowerCase().includes(specialty.toLowerCase()),
        );
      }

      results.specialties = specialties.slice(skip, skip + take);
      totalCount += specialties.length;
    }

    return {
      data: results,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      searchSummary: {
        query,
        specialty,
        city,
        type,
        resultsFound: totalCount,
      },
    };
  }

  // Helper method to get all specialties
  async getSpecialties() {
    const specialtyMap = {
      1: 'General Practice',
      2: 'Cardiology',
      3: 'Dermatology',
      4: 'Pediatrics',
      5: 'Obstetrics & Gynecology',
      6: 'Orthopedics',
      7: 'Neurology',
      8: 'Psychiatry',
      9: 'Ophthalmology',
      10: 'ENT (Ear, Nose, Throat)',
      11: 'Gastroenterology',
      12: 'Urology',
      13: 'Endocrinology',
      14: 'Rheumatology',
      15: 'Oncology',
      16: 'Nephrology',
      17: 'Pulmonology',
      18: 'Hematology',
      19: 'Infectious Diseases',
      20: 'Emergency Medicine',
      21: 'Dentistry',
    };

    return Object.entries(specialtyMap).map(([id, name]) => ({
      id: parseInt(id),
      name,
    }));
  }

  // Autocomplete search for quick suggestions
  async autocomplete(autocompleteDto: AutocompleteDto) {
    const {
      query,
      limit = 5,
      types = 'doctor,specialty,clinic',
    } = autocompleteDto;
    const searchTerm = query.toLowerCase();
    const typeList = types.split(',').map((type) => type.trim());
    const limitNumber = Number(limit);

    const suggestions = [];

    // Specialty suggestions
    if (typeList.includes('specialty')) {
      const specialties = await this.getSpecialties();
      const matchingSpecialties = specialties
        .filter((specialty) =>
          specialty.name.toLowerCase().includes(searchTerm),
        )
        .slice(0, limitNumber)
        .map((specialty) => ({
          type: 'specialty',
          id: specialty.id,
          name: specialty.name,
          display: `${specialty.name} (Specialty)`,
        }));

      suggestions.push(...matchingSpecialties);
    }

    // Doctor name suggestions
    if (typeList.includes('doctor')) {
      const specialties = await this.getSpecialties();
      const matchingDoctors = await this.prisma.doctor.findMany({
        where: {
          OR: [
            { firstName: { contains: searchTerm } },
            { lastName: { contains: searchTerm } },
            { medicalCode: { contains: searchTerm } },
          ],
        },
        include: {
          addresses: {
            where: {
              isPrimary: true,
            },
            take: 1,
          },
          clinicDoctors: {
            include: {
              clinic: {
                select: {
                  name: true,
                  address: true,
                },
              },
            },
          },
        },
        take: limitNumber,
      });

      const doctorSuggestions = matchingDoctors.map((doctor) => {
        const specialty = specialties.find((s) => s.id === doctor.specialityId);
        const specialtyName = specialty ? specialty.name : 'Unknown Specialty';
        const primaryAddress = doctor.addresses[0];
        const clinics = doctor.clinicDoctors.map((cd) => cd.clinic);

        return {
          type: 'doctor',
          id: doctor.id,
          name: `${doctor.firstName} ${doctor.lastName}`,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          specialty: specialtyName,
          medicalCode: doctor.medicalCode,
          address: primaryAddress
            ? {
                addressLine1: primaryAddress.addressLine1,
                addressLine2: primaryAddress.addressLine2,
                cityId: primaryAddress.cityId,
                zipcode: primaryAddress.zipcode,
                country: primaryAddress.country,
              }
            : null,
          clinics: clinics.map((clinic) => ({
            name: clinic.name,
            address: clinic.address,
          })),
          display: `${doctor.firstName} ${doctor.lastName} - ${specialtyName}`,
          fullDisplay: `${doctor.firstName} ${doctor.lastName} (${specialtyName}) - ${primaryAddress?.addressLine1 || 'No address'} - ${clinics.length > 0 ? clinics[0].name : 'No clinic'}`,
        };
      });

      suggestions.push(...doctorSuggestions);
    }

    // Clinic name suggestions
    if (typeList.includes('clinic')) {
      const matchingClinics = await this.prisma.clinic.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm } },
            { description: { contains: searchTerm } },
          ],
        },
        include: {
          clinicDoctors: {
            include: {
              doctor: {
                select: {
                  specialityId: true,
                },
              },
            },
          },
        },
        take: limitNumber,
      });

      const clinicSuggestions = matchingClinics.map((clinic) => {
        const specialties = [
          ...new Set(
            clinic.clinicDoctors.map((cd) => {
              const specialtyId = cd.doctor.specialityId;
              const specialtyMap = {
                1: 'General Practice',
                2: 'Cardiology',
                3: 'Dermatology',
                4: 'Pediatrics',
                5: 'Obstetrics & Gynecology',
                6: 'Orthopedics',
                7: 'Neurology',
                8: 'Psychiatry',
                9: 'Ophthalmology',
                10: 'ENT (Ear, Nose, Throat)',
                11: 'Gastroenterology',
                12: 'Urology',
                13: 'Endocrinology',
                14: 'Rheumatology',
                15: 'Oncology',
                16: 'Nephrology',
                17: 'Pulmonology',
                18: 'Hematology',
                19: 'Infectious Diseases',
                20: 'Emergency Medicine',
                21: 'Dentistry',
              };
              return specialtyMap[specialtyId] || 'Unknown Specialty';
            }),
          ),
        ];

        return {
          type: 'clinic',
          id: clinic.id,
          name: clinic.name,
          address: clinic.address,
          description: clinic.description,
          phone: clinic.phone,
          specialties: specialties,
          display: `${clinic.name} (Clinic)`,
          fullDisplay: `${clinic.name} - ${clinic.address} - Specialties: ${specialties.join(', ')}`,
        };
      });

      suggestions.push(...clinicSuggestions);
    }

    // Disease suggestions (placeholder - needs proper implementation)
    if (typeList.includes('disease')) {
      // For now, return placeholder disease suggestions
      // In a real implementation, you would query a diseases database
      const diseaseSuggestions = [
        {
          type: 'disease',
          id: 'diabetes',
          name: 'Diabetes',
          display: 'Diabetes (Disease)',
        },
        {
          type: 'disease',
          id: 'hypertension',
          name: 'Hypertension',
          display: 'Hypertension (Disease)',
        },
        {
          type: 'disease',
          id: 'asthma',
          name: 'Asthma',
          display: 'Asthma (Disease)',
        },
      ]
        .filter((disease) => disease.name.toLowerCase().includes(searchTerm))
        .slice(0, limitNumber);

      suggestions.push(...diseaseSuggestions);
    }

    // Sort by relevance and limit results
    const sortedSuggestions = suggestions
      .sort((a, b) => {
        // Prioritize exact matches at the beginning
        const aStartsWith = a.name.toLowerCase().startsWith(searchTerm);
        const bStartsWith = b.name.toLowerCase().startsWith(searchTerm);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        // Then prioritize by type order: specialty > doctor > clinic > disease
        const typePriority = { specialty: 0, doctor: 1, clinic: 2, disease: 3 };
        return typePriority[a.type] - typePriority[b.type];
      })
      .slice(0, limitNumber);

    return {
      query,
      types: typeList,
      suggestions: sortedSuggestions,
      total: sortedSuggestions.length,
    };
  }
}
