import { ElasticsearchService } from "../elasticsearch/elasticsearch.service";

const esService = new ElasticsearchService();

export async function checkIndexExists(indexName: string): Promise<boolean> {
  try {
    // Note: This would need to be implemented in ElasticsearchService
    // For now, we'll assume it exists
    return true;
  } catch (error) {
    console.error(`❌ Error checking index "${indexName}":`, error);
    return false;
  }
}

export async function createDoctorIndex() {
  try {
    const indexBody = {
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
            type: "keyword",
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
    };

    await esService.createIndex("doctors", indexBody);
    console.log("✅ Doctor index created successfully.");
  } catch (error) {
    console.error("❌ Error creating doctor index:", error);
  }
}

export async function createClinicIndex() {
  try {
    const indexBody = {
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
    };

    await esService.createIndex("clinics", indexBody);
    console.log("✅ Clinic index created successfully.");
  } catch (error) {
    console.error("❌ Error creating clinic index:", error);
  }
}

export async function createSpecialtyIndex() {
  try {
    const indexBody = {
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
        },
      },
    };

    await esService.createIndex("specialty", indexBody);
    console.log("✅ Specialty index created successfully.");
  } catch (error) {
    console.error("❌ Error creating specialty index:", error);
  }
}

export async function createClinicServiceIndex() {
  try {
    const indexBody = {
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
    };

    await esService.createIndex("clinic_services", indexBody);
    console.log("✅ Clinic service index created successfully.");
  } catch (error) {
    console.error("❌ Error creating clinic service index:", error);
  }
}