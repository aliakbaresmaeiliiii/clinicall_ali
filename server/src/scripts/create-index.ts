import { esClient } from "../app";

export async function checkIndexExists(indexName: string): Promise<boolean> {
  try {
    return await esClient.indices.exists({ index: indexName });
  } catch (error) {
    console.error(`❌ Error checking index "${indexName}":`, error);
    return false;
  }
}

export async function createDoctorIndex() {
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
          analysis: {
            analyzer: {
              autocomplete: {
                type: "custom",
                tokenizer: "autocomplete_tokenizer",
                filter: ["lowercase"],
              },
            },
            tokenizer: {
              autocomplete_tokenizer: {
                type: "edge_ngram",
                min_gram: 1,
                max_gram: 20,
                token_chars: ["letter", "digit"],
              },
            },
          },
        },
        mappings: {
          properties: {
            id: { type: "keyword" },

            name: {
              type: "text",
              analyzer: "autocomplete",
              search_analyzer: "standard",
              fields: {
                keyword: { type: "keyword" },
              },
            },

            specialty_name: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },

            // insurance_name: {
            //   type: "text",
            //   fields: {
            //     keyword: { type: "keyword" },
            //   },
            // },

            average_rating: { type: "float" },

            clinic_name: {
              type: "text",
              analyzer: "autocomplete",
              search_analyzer: "standard",
              fields: {
                keyword: { type: "keyword" },
              },
            },

            languages: {
              type: "keyword",
            },

            available_days: {
              type: "keyword", // like ["Monday", "Wednesday"]
            },

            addresses: {
              type: "nested",
              properties: {
                street: { type: "text" },
                city: { type: "keyword" },
                state: { type: "keyword" },
                zip: { type: "keyword" },
                location: { type: "geo_point" },
              },
            },
          },
        },
      },
    });

    await esClient.indices.refresh({ index: "doctors" });
    console.log("✅ Doctor index created successfully.");
  } catch (error) {
    console.error("❌ Error creating doctor index:", error);
  }
}

export async function createClinicIndex() {
  try {
    const exists = await esClient.indices.exists({ index: "clinics" });

    if (exists) {
      console.log("⚠️ Index 'clinics' already exists. Deleting it...");
      await esClient.indices.delete({ index: "clinics" });
    }

    await esClient.indices.create({
      index: "clinics",
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
          analysis: {
            analyzer: {
              autocomplete: {
                type: "custom",
                tokenizer: "autocomplete_tokenizer",
                filter: ["lowercase"],
              },
            },
            tokenizer: {
              autocomplete_tokenizer: {
                type: "edge_ngram",
                min_gram: 1,
                max_gram: 20,
                token_chars: ["letter", "digit"],
              },
            },
          },
        },
        mappings: {
          properties: {
            id: { type: "keyword" },
            name: {
              type: "text",
              analyzer: "autocomplete",
              search_analyzer: "standard",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            specialty_name: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            average_rating: { type: "float" },

            available_days: {
              type: "keyword",
            },

            addresses: {
              type: "nested",
              properties: {
                city: { type: "keyword" },
                state: { type: "keyword" },
                zip: { type: "keyword" },
                location: { type: "geo_point" },
              },
            },
          },
        },
      },
    });

    await esClient.indices.refresh({ index: "clinics" });
    console.log("✅ Clinic index created successfully.");
  } catch (error) {
    console.error("❌ Error creating clinic index:", error);
  }
}

export async function createSpecialtyIndex() {
  try {
    const exists = await esClient.indices.exists({ index: "specialty" });
  } catch (error) {}
}

export async function createClinicServiceIndex() {
  try {
    const exists = await esClient.indices.exists({ index: "clinic_services" });

    if (exists) {
      console.log(
        "⚠️ Index 'clinic_services' already exists. Skipping creation."
      );
      return;
    }

    await esClient.indices.create({
      index: "clinic_services",
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
        },
        mappings: {
          properties: {
            id: { type: "keyword" },
            clinic_id: { type: "keyword" },
            speciality_id: { type: "keyword" },
          },
        },
      },
    });

    await esClient.indices.refresh({ index: "clinic_services" });
    console.log("✅ Clinic service index created successfully.");
  } catch (error) {
    console.error("❌ Error creating clinic service index:", error);
  }
}
