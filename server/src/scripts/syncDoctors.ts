import { Client } from "@elastic/elasticsearch";
import { coreSchema, query, RowDataPacket } from "../bin/mysql";

const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

export async function syncDoctorsToElasticsearch() {
  try {
    const rows = await query<RowDataPacket[]>(`
      SELECT
       d.id,
       CONCAT(first_name, " ", last_name) AS name,
       d.average_rating,
       s.name AS specialty_name,
       GROUP_CONCAT(ss.sub_specialty) AS sub_specialties
      FROM ${coreSchema}.doctors d
      LEFT JOIN ${coreSchema}.specialties s ON d.specialty_id = s.id
      LEFT JOIN ${coreSchema}.sub_specialties ss ON d.id = ss.specialty_id
      GROUP BY d.id,s.name ,d.average_rating
    `);

    if (rows.length === 0) {
      console.log("❌ No doctors found in MySQL");
      return;
    }

    const body = rows.flatMap((doc: any) => [
      { index: { _id: doc.id } },
      {
        name: doc.name,
        average_rating: doc.average_rating,
        specialty_name: doc.specialty_name,
        sub_specialties: doc.sub_specialties
          ? doc.sub_specialties.split(",")
          : [],
      },
    ]);
    const response = await esClient.bulk({ index: "doctors", body });

    if (response.errors) {
      console.error(
        "❌ Bulk index errors:",
        JSON.stringify(response.items, null, 2)
      );
    } else {
      console.log("✅ Doctors synced successfully");
    }

    await esClient.indices.refresh({ index: "doctors" });
  } catch (error) {
    console.error("❌ Sync failed:", error);
  }
}
