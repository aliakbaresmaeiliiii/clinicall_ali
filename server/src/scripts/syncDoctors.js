"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDoctorsToElasticsearch = syncDoctorsToElasticsearch;
exports.searchDoctors = searchDoctors;
exports.removeDeleteDoctorsFromElasticSeach = removeDeleteDoctorsFromElasticSeach;
var elasticsearch_1 = require("@elastic/elasticsearch");
var mysql_1 = require("../bin/mysql");
var db_1 = require("../controller/doctors/db");
var esClient = new elasticsearch_1.Client({
    node: process.env.ELASTICSEARCH_URL,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME || "elastic",
        password: process.env.ELASTICSEARCH_PASSWORD || "@Ali0011914505",
    },
});
function syncDoctorsToElasticsearch() {
    return __awaiter(this, void 0, void 0, function () {
        var doctors, rows, body, chunkSize, i, chunk, response, erroredDocuments, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, (0, db_1.getDoctorsFromElastic)({
                            name: "John Doe",
                            city_id: "1",
                            service_id: "123",
                            specialty_id: "456",
                            insurance_id: "789",
                            minRating: 3,
                            maxRating: 5,
                            isPopular: true,
                        })];
                case 1:
                    doctors = _a.sent();
                    console.log("Doctors Found:", doctors);
                    return [4 /*yield*/, (0, mysql_1.query)("\n      SELECT \n        d.id, d.first_name, d.last_name, d.profile_img, d.email, d.phone, \n        CONCAT(d.first_name, ' ', d.last_name) AS name,\n        d.specialty_id, d.insurance_id, d.click_count, d.medical_code,\n        sp.name AS specialty_name,\n        JSON_ARRAYAGG(ss.id) AS service_ids,\n        JSON_ARRAYAGG(ci.id) AS cities_ids,\n        i.name AS insurance_name,  \n        COUNT(r.id) AS total_reviews,\n        COALESCE(AVG(r.rating), 0) AS average_rating,\n        COALESCE(AVG(r.professional_demeanor), 0) AS avg_professional_demeanor,\n        COALESCE(AVG(r.sufficient_time), 0) AS avg_sufficient_time,\n        COALESCE(AVG(r.skill), 0) AS avg_skill,\n        COALESCE(AVG(r.staff_behavior), 0) AS avg_staff_behavior,\n        COALESCE(AVG(r.clinic_condition), 0) AS avg_clinic_condition,\n        d.updated_at,\n        CASE \n          WHEN EXISTS (SELECT 1 FROM ".concat(mysql_1.coreSchema, ".doctor_likes dl WHERE dl.doctor_id = d.id) \n          THEN 1 ELSE 0\n        END AS isLiked,\n\n        COALESCE(ROUND((SUM(CASE WHEN r.recommendations = 1 THEN 1 ELSE 0 END) / COUNT(r.id)) * 100, 2), 0) \n        AS user_suggestion_percentage,\n\n        -- Properly formatted JSON array of addresses\n        JSON_ARRAYAGG(\n          JSON_OBJECT(\n            'city_id', ci.id,\n            'country', ld.country,\n            'latitude', ld.latitude,\n            'longitude', ld.longitude,\n            'address_line1', ld.address_line1,\n            'address_line2', ld.address_line2,\n            'zipcode', ld.zipcode,\n            'city', ci.name,\n            'state', ci.state\n          )\n        ) AS addresses,\n         MAX(ci.id) AS city_id \n\n      FROM \n        ").concat(mysql_1.coreSchema, ".doctors d\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".doctor_locations ld ON d.id = ld.doctor_id\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".specialties sp ON d.specialty_id = sp.id\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".services ss ON sp.id = ss.specialty_id\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".doctor_reviews r ON d.id = r.doctor_id\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".insurances i ON d.insurance_id = i.id\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".cities ci ON ld.city_id = ci.id\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".doctor_likes dk ON d.id = dk.doctor_id\n      WHERE d.updated_at >= NOW() - INTERVAL 1 DAY\n\n      GROUP BY d.id\n    "))];
                case 2:
                    rows = _a.sent();
                    if (rows.length === 0) {
                        console.log("❌ No doctors found in MySQL");
                        return [2 /*return*/];
                    }
                    body = rows.flatMap(function (doc) { return [
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
                            service_ids: doc.service_id && typeof doc.service_ids === "string"
                                ? JSON.parse(doc.service_ids)
                                : Array.isArray(doc.service_ids)
                                    ? doc.service_ids
                                    : [],
                            cities_ids: doc.city_id && typeof doc.cities_ids === "string"
                                ? JSON.parse(doc.cities_ids)
                                : Array.isArray(doc.cities_ids)
                                    ? doc.cities_ids
                                    : [],
                            addresses: doc.addresses && typeof doc.addresses === "string"
                                ? JSON.parse(doc.addresses)
                                : Array.isArray(doc.addresses)
                                    ? doc.addresses
                                    : [],
                        },
                    ]; });
                    chunkSize = 1000;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < body.length)) return [3 /*break*/, 6];
                    chunk = body.slice(i, i + chunkSize);
                    return [4 /*yield*/, esClient.bulk({ index: "doctors", body: chunk })];
                case 4:
                    response = _a.sent();
                    if (response.errors) {
                        erroredDocuments = response.items.filter(function (item) { return item.index && item.index.error; });
                        console.error("\u274C ".concat(erroredDocuments.length, " errors occurred in bulk insert"), erroredDocuments);
                    }
                    else {
                        console.log("✅ Doctors synced successfully");
                    }
                    _a.label = 5;
                case 5:
                    i += chunkSize;
                    return [3 /*break*/, 3];
                case 6: 
                // const response = await esClient.bulk({ index: "doctors", body });
                return [4 /*yield*/, esClient.indices.refresh({ index: "doctors" })];
                case 7:
                    // const response = await esClient.bulk({ index: "doctors", body });
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error("❌ Sync failed:", error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function searchDoctors(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, esClient.search({
                            index: "doctors",
                            size: 20,
                            query: {
                                bool: {
                                    should: [
                                        {
                                            multi_match: {
                                                query: query,
                                                fields: ["name", "specialty_name", "insurance_name", "city"],
                                            },
                                        },
                                        { match_phrase_prefix: { name: query } },
                                        { match_phrase_prefix: { specialty_name: query } },
                                        { match_phrase_prefix: { insurance_name: query } },
                                        { match_phrase_prefix: { city: query } },
                                    ],
                                    minimum_should_match: 1,
                                },
                            },
                            sort: [{ average_rating: "desc" }],
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.hits.hits.map(function (hit) { return hit._source; })];
                case 2:
                    error_2 = _a.sent();
                    console.error("❌ Error searching doctors:", error_2);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function removeDeleteDoctorsFromElasticSeach() {
    return __awaiter(this, void 0, void 0, function () {
        var deletedDoctors, body, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, mysql_1.query)("SELECT id FROM ".concat(mysql_1.coreSchema, ".doctors WHERE deleted_at >= NOW() - INTERVAL 1 DAY;"))];
                case 1:
                    deletedDoctors = _a.sent();
                    if (deletedDoctors.length === 0) {
                        console.log("✅ No deleted doctors to remove");
                        return [2 /*return*/];
                    }
                    body = deletedDoctors.flatMap(function (doc) { return [
                        { delete: { _index: "doctors", _id: doc.id } },
                    ]; });
                    return [4 /*yield*/, esClient.bulk({ body: body })];
                case 2:
                    response = _a.sent();
                    if (response.errors) {
                        console.error("❌ Errors occurred in bulk delete:", response.items);
                    }
                    else {
                        console.log("✅ Deleted doctors removed from Elasticsearch");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("❌ Deletion sync failed:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
