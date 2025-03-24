import { esClient } from "../app";



export async function checkIndexExists(): Promise<boolean> {
  try {
    return await esClient.indices.exists({ index: "doctors" });
  } catch (error) {
    console.error("❌ Error checking index existence:", error);
    return false;
  }
}



export async function createDoctorsIndex() {
  try {
    const exists = await esClient.indices.exists({ index: "doctors" });

    if (exists) {
      console.log("⚠️ Index 'doctors' already exists. Skipping creation.");
      return;
    }
    console.log("🔍 esClient:👍👍👍👍👍", esClient);

    await esClient.indices.create({
      index: "doctors",
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
        },
        mappings: {
          properties: {
            id: { type: "keyword" },
            name: { type: "text" },
            specialty_name: { type: "text" },
            insurance_name: { type: "text" },
            addresses: {
              type: "nested",
              properties: {
                street: { type: "text" },
                city: { type: "text" },
                state: { type: "keyword" },
                zip: { type: "keyword" },
                lat: { type: "float" },
                lon: { type: "float" },
              },
            },
            average_rating: { type: "float" },
          },
        },
      },
    });

    console.log("✅ Index 'doctors' created successfully");
  } catch (error) {
    console.error("❌ Error creating index:", error);
  }
}

