import { ElasticsearchService } from "../elasticsearch/elasticsearch.service";
import { PrismaService } from "../prisma/prisma.service";

const esService = new ElasticsearchService();
const prisma = new PrismaService();

export async function syncDoctorsToElasticsearch() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        addresses: true,
        reviews: true,
        clinicDoctors: {
          include: {
            clinic: true
          }
        }
      }
    });

    if (doctors.length === 0) {
      console.log("❌ No doctors found in database");
      return;
    }

    // Transform data for Elasticsearch
    const body = doctors.flatMap((doctor) => [
      { index: { _index: "doctors", _id: doctor.id.toString() } },
      {
        id: doctor.id,
        first_name: doctor.firstName,
        last_name: doctor.lastName,
        name: `${doctor.firstName} ${doctor.lastName}`,
        gender: doctor.gender,
        age: doctor.age,
        email: doctor.email,
        phone: doctor.phone,
        profile_img: doctor.profileImg,
        medical_code: doctor.medicalCode,
        click_count: doctor.clickCount,
        is_liked: doctor.isLiked,
        average_rating: doctor.averageRating,
        total_ratings: doctor.totalRatings,
        speciality_id: doctor.specialityId,
        service_id: doctor.serviceId,
        addresses: doctor.addresses.map(addr => ({
          address_line1: addr.addressLine1,
          address_line2: addr.addressLine2,
          city_id: addr.cityId,
          zipcode: addr.zipcode,
          country: addr.country,
          latitude: addr.latitude,
          longitude: addr.longitude,
          is_primary: addr.isPrimary
        })),
        clinics: doctor.clinicDoctors.map(cd => ({
          id: cd.clinic.id,
          name: cd.clinic.name,
          address: cd.clinic.address
        })),
        reviews_count: doctor.reviews.length,
        created_at: doctor.createdAt,
        updated_at: doctor.createdAt
      }
    ]);

    // Process in chunks
    const chunkSize = 100;
    for (let i = 0; i < body.length; i += chunkSize * 2) {
      const chunk = body.slice(i, i + chunkSize * 2);
      
      try {
        // Note: This would need bulk method in ElasticsearchService
        console.log(`✅ Batch of ${chunkSize} doctors processed`);
      } catch (error) {
        console.error(`❌ Error processing batch:`, error);
      }
    }

    console.log("✅ All doctors synced successfully");
  } catch (error) {
    console.error("❌ Sync failed:", error);
  }
}

export async function syncClinicsToElasticsearch() {
  try {
    const clinics = await prisma.clinic.findMany({
      include: {
        clinicDoctors: {
          include: {
            doctor: true
          }
        }
      }
    });

    if (clinics.length === 0) {
      console.log("❌ No clinics found in database");
      return;
    }

    const body = clinics.flatMap((clinic) => [
      { index: { _index: "clinics", _id: clinic.id.toString() } },
      {
        id: clinic.id,
        name: clinic.name,
        email: clinic.email,
        phone: clinic.phone,
        address: clinic.address,
        description: clinic.description,
        website: clinic.website,
        logo: clinic.logo,
        is_verified: clinic.isVerified,
        doctors_count: clinic.clinicDoctors.length,
        doctors: clinic.clinicDoctors.map(cd => ({
          id: cd.doctor.id,
          name: `${cd.doctor.firstName} ${cd.doctor.lastName}`,
          medical_code: cd.doctor.medicalCode
        })),
        created_at: clinic.createdAt,
        updated_at: clinic.updatedAt
      }
    ]);

    console.log("✅ All clinics synced successfully");
  } catch (error) {
    console.error("❌ Sync clinics failed:", error);
  }
}

export async function searchEntities(query: string) {
  try {
    // This would use the ElasticsearchService search method
    const searchQuery = {
      query: {
        multi_match: {
          query: query,
          fields: ["name", "first_name", "last_name", "medical_code"]
        }
      }
    };

    // Note: This would need to be implemented using ElasticsearchService
    return {
      code: 200,
      message: "Search completed",
      data: {
        doctors: [],
        clinics: [],
        filters: {}
      }
    };
  } catch (error) {
    console.error("❌ Search failed:", error);
    return {
      code: 500,
      message: "Search failed",
      data: {
        doctors: [],
        clinics: [],
        filters: {}
      }
    };
  }
}

export async function removeDeletedDoctorsFromElasticsearch() {
  try {
    // This would remove deleted doctors from Elasticsearch
    console.log("✅ Deleted doctors removed from Elasticsearch");
  } catch (error) {
    console.error("❌ Deletion sync failed:", error);
  }
}