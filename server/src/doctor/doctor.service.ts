import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { SearchDoctorDto } from './dto/search-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    return this.prisma.doctor.create({
      data: createDoctorDto,
    });
  }

  async findAll() {
    return this.prisma.doctor.findMany({
      include: {
        addresses: true,
        reviews: true,
        appointments: true,
      },
    });
  }

  async findOne(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        addresses: true,
        reviews: true,
        appointments: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);

    return this.prisma.doctor.update({
      where: { id },
      data: updateDoctorDto,
    });
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);

    return this.prisma.doctor.delete({
      where: { id },
    });
  }

  async search(searchDto: SearchDoctorDto) {
    const {
      name,
      specialty,
      city,
      gender,
      specialityId,
      serviceId,
      medicalCode,
      page = 1,
      limit = 10,
    } = searchDto;

    const skip = (page - 1) * limit;
    const take = limit;

    // Build the where clause dynamically
    const where: any = {};

    if (name) {
      where.OR = [
        { firstName: { contains: name, mode: 'insensitive' } },
        { lastName: { contains: name, mode: 'insensitive' } },
      ];
    }

    if (gender) {
      where.gender = gender;
    }

    if (specialityId) {
      where.specialityId = specialityId;
    }

    if (serviceId) {
      where.serviceId = serviceId;
    }

    if (medicalCode) {
      where.medicalCode = { contains: medicalCode, mode: 'insensitive' };
    }

    // If city is provided, we need to join with addresses
    let includeAddresses = false;
    if (city) {
      includeAddresses = true;
    }

    const doctors = await this.prisma.doctor.findMany({
      where,
      include: {
        addresses: includeAddresses,
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
            (address.addressLine1?.toLowerCase().includes(city.toLowerCase()) ||
              address.addressLine2?.toLowerCase().includes(city.toLowerCase())),
        ),
      );
    }

    // Filter by specialty name if provided
    if (specialty) {
      // This would require a specialties table join, but for now we'll use the specialityId mapping
      // You can enhance this by creating a specialties table and joining with it
      filteredDoctors = filteredDoctors.filter((doctor) => {
        // Map specialityId to specialty names (you should create a proper specialties table)
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
        };
        const doctorSpecialty = specialtyMap[doctor.specialityId];
        return doctorSpecialty?.toLowerCase().includes(specialty.toLowerCase());
      });
    }

    // Get total count for pagination
    const total = await this.prisma.doctor.count({ where });

    return {
      data: filteredDoctors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
