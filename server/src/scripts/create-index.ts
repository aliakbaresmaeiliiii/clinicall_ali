import { Client } from "@elastic/elasticsearch";

const esClient = new Client({ node: "http://localhost:9200" });

export async function createDoctorsIndex() {
  try {
    const exists = await esClient.indices.exists({ index: "doctors" });

    if (exists) {
      console.log("⚠️ Index 'doctors' already exists. Skipping creation.");
      return;
    }

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
            addresses: { type: "nested" },
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

createDoctorsIndex();
