import { Client } from "@elastic/elasticsearch";


console.log('ELASTICSEARCH_URL:', process.env.ELASTICSEARCH_URL);

const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "",
    password: process.env.ELASTICSEARCH_PASSWORD || "",
  },
});

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
