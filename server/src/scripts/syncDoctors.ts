import { Client } from "@elastic/elasticsearch";
import { coreSchema, query, RowDataPacket } from "../bin/mysql";
import { getUserSuggestionPercentage } from "../controller/doctors/db";

const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

export async function syncDoctorsToElasticsearch() {
  try {
    const rows = await query<RowDataPacket[]>(`
      SELECT 
        d.id, d.first_name, d.last_name, d.profile_img, d.email, d.phone, 
        CONCAT(d.first_name, ' ', d.last_name) AS name,
        d.specialty_id, d.insurance_id, d.click_count, d.medical_code,
        sp.name AS specialty_name,
        JSON_ARRAYAGG(ss.id) AS service_ids,
        JSON_ARRAYAGG(ci.id) AS cities_ids,
        i.name AS insurance_name,  
        COUNT(r.id) AS total_reviews,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        COALESCE(AVG(r.professional_demeanor), 0) AS avg_professional_demeanor,
        COALESCE(AVG(r.sufficient_time), 0) AS avg_sufficient_time,
        COALESCE(AVG(r.skill), 0) AS avg_skill,
        COALESCE(AVG(r.staff_behavior), 0) AS avg_staff_behavior,
        COALESCE(AVG(r.clinic_condition), 0) AS avg_clinic_condition,
        CASE 
          WHEN EXISTS (SELECT 1 FROM ${coreSchema}.doctor_likes dl WHERE dl.doctor_id = d.id) 
          THEN 1 ELSE 0
        END AS isLiked,

        COALESCE(ROUND((SUM(CASE WHEN r.recommendations = 1 THEN 1 ELSE 0 END) / COUNT(r.id)) * 100, 2), 0) 
        AS user_suggestion_percentage,

        -- Properly formatted JSON array of addresses
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'city_id', ci.id,
            'country', ld.country,
            'latitude', ld.latitude,
            'longitude', ld.longitude,
            'address_line1', ld.address_line1,
            'address_line2', ld.address_line2,
            'zipcode', ld.zipcode,
            'city', ci.name,
            'state', ci.state
          )
        ) AS addresses,
         MAX(ci.id) AS city_id 

      FROM 
        ${coreSchema}.doctors d
      LEFT JOIN ${coreSchema}.doctor_locations ld ON d.id = ld.doctor_id
      LEFT JOIN ${coreSchema}.specialties sp ON d.specialty_id = sp.id
      LEFT JOIN ${coreSchema}.services ss ON sp.id = ss.specialty_id
      LEFT JOIN ${coreSchema}.doctor_reviews r ON d.id = r.doctor_id
      LEFT JOIN ${coreSchema}.insurances i ON d.insurance_id = i.id
      LEFT JOIN ${coreSchema}.cities ci ON ld.city_id = ci.id
      LEFT JOIN ${coreSchema}.doctor_likes dk ON d.id = dk.doctor_id

      GROUP BY d.id
    `);

    if (rows.length === 0) {
      console.log("❌ No doctors found in MySQL");
      return;
    }

    const body = rows.flatMap((doc: any) => [
      { index: { _id: doc.id } },
      {
        id: doc.id,
        name: doc.name,
        profile_img: doc.profile_img,
        email: doc.email,
        phone: doc.phone,
        specialty_id: doc.specialty_id,
        insurance_id: doc.insurance_id,
        specialty_name: doc.specialty_name,
        insurance_name: doc.insurance_name,
        click_count: doc.click_count,
        medical_code: doc.medical_code,
        average_rating: doc.average_rating,
        total_reviews: doc.total_reviews,
        avg_professional_demeanor: doc.avg_professional_demeanor,
        avg_sufficient_time: doc.avg_sufficient_time,
        avg_skill: doc.avg_skill,
        avg_staff_behavior: doc.avg_staff_behavior,
        avg_clinic_condition: doc.avg_clinic_condition,
        isLiked: doc.isLiked,
        user_suggestion_percentage: doc.user_suggestion_percentage,
        service_ids:
          doc.service_id && typeof doc.service_ids === "string"
            ? JSON.parse(doc.service_ids)
            : Array.isArray(doc.service_ids)
            ? doc.service_ids
            : [],
        cities_ids:
          doc.city_id && typeof doc.cities_ids === "string"
            ? JSON.parse(doc.cities_ids)
            : Array.isArray(doc.cities_ids)
            ? doc.cities_ids
            : [],
        addresses:
          doc.addresses && typeof doc.addresses === "string"
            ? JSON.parse(doc.addresses)
            : Array.isArray(doc.addresses)
            ? doc.addresses
            : [],
      },
    ]);

    const chunkSize = 1000;
    for (let i = 0; i < body.length; i += chunkSize) {
      const chunk = body.slice(i, i + chunkSize);
      const response = await esClient.bulk({ index: "doctors", body: chunk });

      if (response.errors) {
        const erroredDocuments = response.items.filter((item: any) => item.index && item.index.error);
        console.error(`❌ ${erroredDocuments.length} errors occurred in bulk insert`, erroredDocuments);
      } else {
        console.log("✅ Doctors synced successfully");
      }
      
    }

    // const response = await esClient.bulk({ index: "doctors", body });

    await esClient.indices.refresh({ index: "doctors" });
  } catch (error) {
    console.error("❌ Sync failed:", error);
  }
}
