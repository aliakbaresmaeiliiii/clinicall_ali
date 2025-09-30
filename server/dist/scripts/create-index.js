"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIndexExists = checkIndexExists;
exports.createDoctorIndex = createDoctorIndex;
exports.createClinicIndex = createClinicIndex;
exports.createSpecialtyIndex = createSpecialtyIndex;
exports.createClinicServiceIndex = createClinicServiceIndex;
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
const esService = new elasticsearch_service_1.ElasticsearchService();
async function checkIndexExists(indexName) {
    try {
        return true;
    }
    catch (error) {
        console.error(`❌ Error checking index "${indexName}":`, error);
        return false;
    }
}
async function createDoctorIndex() {
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
    }
    catch (error) {
        console.error("❌ Error creating doctor index:", error);
    }
}
async function createClinicIndex() {
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
    }
    catch (error) {
        console.error("❌ Error creating clinic index:", error);
    }
}
async function createSpecialtyIndex() {
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
    }
    catch (error) {
        console.error("❌ Error creating specialty index:", error);
    }
}
async function createClinicServiceIndex() {
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
    }
    catch (error) {
        console.error("❌ Error creating clinic service index:", error);
    }
}
//# sourceMappingURL=create-index.js.map