import { Client } from "@elastic/elasticsearch";
import { coreSchema, query, RowDataPacket } from "../bin/mysql";

const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

export async function syncDoctorsToElasticsearch() {
  try {
    const rows = await query<RowDataPacket[]>(`
      SELECT id, CONCAT(first_name, " ", last_name) as name, specialty_id, average_rating
      FROM ${coreSchema}.doctors
    `);

    if (rows.length === 0) {
      console.log("❌ No doctors found in MySQL");
      return;
    }

    const body = rows.flatMap((doc: any) => [{ index: { _id: doc.id } }, doc]);

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
