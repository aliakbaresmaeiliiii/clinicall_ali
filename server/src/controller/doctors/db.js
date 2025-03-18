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
exports.getDoctorsFromElastic = getDoctorsFromElastic;
exports.addDoctor = addDoctor;
exports.getUserSuggestionPercentage = getUserSuggestionPercentage;
exports.like = like;
exports.getDoctoLike = getDoctoLike;
exports.getServices = getServices;
exports.checkDoctorPhoneNumberExists = checkDoctorPhoneNumberExists;
exports.updateDoctor = updateDoctor;
exports.recordDoctorProfileView = recordDoctorProfileView;
exports.addComment = addComment;
exports.getSpecialties = getSpecialties;
exports.getSubSpecialtiesById = getSubSpecialtiesById;
exports.filterSpecialtyById = filterSpecialtyById;
exports.getSuggestionsBySpecialty = getSuggestionsBySpecialty;
exports.filterServicesById = filterServicesById;
exports.existingFeedback = existingFeedback;
exports.insertReviews = insertReviews;
exports.getReviews = getReviews;
exports.doctorSchadules = doctorSchadules;
exports.doctorScheduleTimeAvailability = doctorScheduleTimeAvailability;
exports.booked = booked;
var elasticsearch_1 = require("@elastic/elasticsearch");
var mysql_1 = require("../../bin/mysql");
var response_error_1 = require("../../modules/error/response_error");
var schema_1 = require("./schema");
var bcrypt_1 = require("bcrypt");
var uuid_1 = require("uuid");
// const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });
var esClient = new elasticsearch_1.Client({
    node: "http://localhost:9200",
    auth: { username: "elastic", password: "@Ali0011914505" },
});
function indexDoctorData(doctor) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, esClient.index({
                        index: "doctors",
                        id: doctor.id,
                        document: doctor,
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getDoctorsFromElastic(filters) {
    return __awaiter(this, void 0, void 0, function () {
        var must, query_1, body, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    must = [];
                    if (filters.name) {
                        must.push({ match: { name: filters.name } });
                    }
                    if (filters.doctor_id) {
                        must.push({ match: { id: filters.doctor_id } });
                    }
                    if (filters.specialty_id) {
                        must.push({ match: { specialty_id: filters.specialty_id } });
                    }
                    if (filters.service_id) {
                        must.push({ match: { service_ids: filters.service_id } });
                    }
                    if (filters.insurance_id) {
                        must.push({
                            match: { insurance_id: filters.insurance_id },
                        });
                    }
                    if (filters.city_id) {
                        must.push({
                            match: { "addresses.city_id": filters.city_id },
                        });
                    }
                    if (filters.minRating !== undefined || filters.maxRating !== undefined) {
                        must.push({
                            range: {
                                average_rating: {
                                    gte: filters.minRating || 0,
                                    lte: filters.maxRating || 5,
                                },
                            },
                        });
                    }
                    if (filters.isPopular) {
                        must.push({
                            range: {
                                average_rating: {
                                    gte: 4,
                                },
                            },
                        });
                    }
                    query_1 = must.length > 0 ? { bool: { must: must } } : { match_all: {} };
                    return [4 /*yield*/, esClient.search({
                            index: "doctors",
                            body: {
                                query: query_1,
                            },
                        })];
                case 1:
                    body = _a.sent();
                    console.log(JSON.stringify(body, null, 2));
                    return [2 /*return*/, body.hits.hits.map(function (hit) { return hit._source; })];
                case 2:
                    error_1 = _a.sent();
                    console.log(JSON.stringify(error_1.meta.body, null, 2));
                    console.error("Elasticsearch error:", error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addDoctor(data) {
    return __awaiter(this, void 0, void 0, function () {
        var password, confirmPassword, fdPassword, validPassword, saltRounds, hashedPassword, newId, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = data.password.password;
                    confirmPassword = data.password.confirmPassword;
                    fdPassword = { password: password, confirmPassword: confirmPassword };
                    validPassword = schema_1.doctorSchema.validateSyncAt("confirmPassword", fdPassword);
                    saltRounds = 10;
                    return [4 /*yield*/, bcrypt_1.default.hash(validPassword, saltRounds)];
                case 1:
                    hashedPassword = _a.sent();
                    if (validPassword.error) {
                        throw new response_error_1.ResponseError.Unauthorized("Password is invalid");
                    }
                    newId = (0, uuid_1.v4)();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, mysql_1.query)("INSERT INTO ".concat(mysql_1.coreSchema, ".doctors\n        (id,first_name,last_name,email,password,token_verify,verify_code,phone,created_at,updated_at)\n        VALUES(?,?,?,?,?,?,?,?,?,?)"), {
                            values: [
                                newId,
                                data.first_name,
                                data.last_name,
                                data.email,
                                hashedPassword,
                                data.token_verify,
                                data.verify_code,
                                data.phone,
                                new Date(),
                                new Date(),
                            ],
                        })];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 4:
                    error_2 = _a.sent();
                    console.error("Database Error:", error_2.message);
                    throw new response_error_1.ResponseError.InternalServer("Failed to insert clinic.");
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getUserSuggestionPercentage(doctorId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("SELECT COUNT(id) AS total_reviews,\n      SUM(CASE WHEN recommendation = 1 THEN 1 ELSE 0 END) AS total_recommended\n     FROM ".concat(mysql_1.coreSchema, ".doctor_reviews\n     WHERE doctor_id = ?"), {
                        values: [doctorId],
                    })];
                case 1:
                    result = _a.sent();
                    if (!result.length || result[0].total_reviews === 0)
                        return [2 /*return*/, 0];
                    return [2 /*return*/, parseFloat(((result[0].total_recommended / result[0].total_reviews) * 100).toFixed(2))];
            }
        });
    });
}
function like(data) {
    return __awaiter(this, void 0, void 0, function () {
        var existingLike, totalLikes, isLiked;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("SELECT * FROM ".concat(mysql_1.coreSchema, ".doctor_likes \n     WHERE doctor_id = ? AND patient_id = ?"), {
                        values: [data.doctor_id, data.patient_id],
                    })];
                case 1:
                    existingLike = _a.sent();
                    if (!(existingLike.length > 0)) return [3 /*break*/, 3];
                    // Unlike the doctor: Remove the like
                    return [4 /*yield*/, (0, mysql_1.query)("DELETE FROM ".concat(mysql_1.coreSchema, ".doctor_likes \n       WHERE doctor_id = ? AND patient_id = ?"), {
                            values: [data.doctor_id, data.patient_id],
                        })];
                case 2:
                    // Unlike the doctor: Remove the like
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: 
                // Like the doctor: Insert new like record
                return [4 /*yield*/, (0, mysql_1.query)("INSERT INTO ".concat(mysql_1.coreSchema, ".doctor_likes (doctor_id, patient_id, isLike) \n       VALUES (?, ?, ?)"), {
                        values: [data.doctor_id, data.patient_id, 1],
                    })];
                case 4:
                    // Like the doctor: Insert new like record
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, mysql_1.query)("SELECT COUNT(*) AS count FROM ".concat(mysql_1.coreSchema, ".doctor_likes \n     WHERE doctor_id = ?"), {
                        values: [data.doctor_id],
                    })];
                case 6:
                    totalLikes = _a.sent();
                    isLiked = totalLikes[0].count > 0 ? 1 : 0;
                    return [4 /*yield*/, (0, mysql_1.query)("UPDATE ".concat(mysql_1.coreSchema, ".doctors \n     SET is_liked = ? \n     WHERE id = ?"), {
                            values: [isLiked, data.doctor_id],
                        })];
                case 7:
                    _a.sent();
                    return [2 /*return*/, { success: true, isLiked: isLiked }];
            }
        });
    });
}
function getDoctoLike(patient_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mysql_1.query)("\n      SELECT\n      d.*\n        FROM ".concat(mysql_1.coreSchema, ".doctor_likes dl\n        LEFT JOIN ").concat(mysql_1.coreSchema, ".doctors d\n        ON dl.doctor_id = d.id\n        WHERE dl.patient_id = ?"), {
                            values: [patient_id],
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    throw new response_error_1.ResponseError.InternalServer("Failed to get response");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getServices() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("SELECT * FROM ".concat(mysql_1.coreSchema, ".services"))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
// export async function getMostPopularDoctors(): Promise<any> {
//   try {
//     const result = await query<RowDataPacket[]>(
//       `
//       SELECT
//         d.*,
//         COALESCE(ld.id, 'No Location') AS location,
//         s.name AS specialty_name,
//         (SELECT AVG(r.rating)
//          FROM ${coreSchema}.ratings r
//          WHERE r.id = d.id) AS average_rating,
//         (SELECT COUNT(r.rating)
//          FROM ${coreSchema}.ratings r
//          WHERE r.id = d.id) AS total_ratings
//       FROM
//         ${coreSchema}.doctors d
//       LEFT JOIN
//         ${coreSchema}.doctor_locations ld ON d.id = ld.id
//       LEFT JOIN
//         ${coreSchema}.specialties s ON d.specialty_id = s.id
//       HAVING
//         total_ratings > 3
//       ORDER BY
//         average_rating DESC,
//         total_ratings DESC
//       LIMIT 10;
//       `
//     );
//     return result;
//   } catch (error) {
//     console.log(error);
//     throw new ResponseError.InternalServer("An unexpected error occurred.");
//   }
// }
function checkDoctorPhoneNumberExists(mobile) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("\n      SELECT mobile FROM ".concat(mysql_1.coreSchema, ".doctors\n      where mobile=?\n      "), {
                        values: [mobile],
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function updateDoctor(doctorData) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("\n        UPDATE ".concat(mysql_1.coreSchema, ".doctors\n        SET name = ?\n        WHERE id = ?\n      "), {
                        values: [doctorData.first_name, doctorData.id],
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function recordDoctorProfileView(id) {
    return __awaiter(this, void 0, void 0, function () {
        var updateResult, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mysql_1.query)("\n      UPDATE ".concat(mysql_1.coreSchema, ".doctors\n      SET click_count = click_count + 1\n      WHERE id = ?\n      "), {
                            values: [id],
                        })];
                case 1:
                    updateResult = _a.sent();
                    return [2 /*return*/, updateResult];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    throw new response_error_1.ResponseError.InternalServer("An unexpected error occurred.");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addComment(comment) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("INSERT INTO ".concat(mysql_1.coreSchema, ".comments\n     (id, id, comment_text, rating)\n         VALUES (?, ?, ?, ?)"), {
                        values: [comment.id, comment.id, comment.comment_text, comment.rating],
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function getSpecialties() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("SELECT *\n       FROM ".concat(mysql_1.coreSchema, ".specialties"))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function getSubSpecialtiesById(specialtyId) {
    return __awaiter(this, void 0, void 0, function () {
        var limit, offset, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    limit = 20;
                    offset = 0;
                    return [4 /*yield*/, (0, mysql_1.query)("SELECT \n        s.id AS specialty_id,\n        s.name AS specialty_name,\n        s.images AS specialty_image,\n        ss.id AS sub_specialty_id,\n        ss.sub_specialty AS sub_specialty_name\n      FROM ".concat(mysql_1.coreSchema, ".specialties s\n      LEFT JOIN ").concat(mysql_1.coreSchema, ".sub_specialties ss \n      ON s.id = ss.specialty_id\n      WHERE s.id = ? \n      ORDER BY ss.id;"), { values: [specialtyId] })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.map(function (row) { return ({
                            id: row.sub_specialty_id || null,
                            name: row.sub_specialty_name || "N/A",
                            images: row.specialty_image || "default_image.jpeg",
                        }); })];
                case 2:
                    error_5 = _a.sent();
                    console.error("Error fetching sub-specialties:", error_5);
                    throw new response_error_1.ResponseError.InternalServer("An unexpected error occurred.");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function filterSpecialtyById(specialty) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mysql_1.query)("\n       SELECT \n        d.*, \n        COALESCE(ld.location, 'No Location') AS location,\n        s.name AS specialty_name,\n        (SELECT AVG(rating) \n         FROM ".concat(mysql_1.coreSchema, ".ratings r \n         WHERE r.id = d.id) AS average_rating\n      FROM \n        ").concat(mysql_1.coreSchema, ".doctors d\n      LEFT JOIN \n        ").concat(mysql_1.coreSchema, ".doctor_locations ld ON d.id = ld.id\n      LEFT JOIN \n        ").concat(mysql_1.coreSchema, ".specialties s ON d.specialty_id = s.id\n  \n      WHERE \n      s.id = ?;\n      "), {
                            values: [specialty],
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    throw new response_error_1.ResponseError.InternalServer("...");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getSuggestionsBySpecialty(specialtyId) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mysql_1.query)("\n      SELECT s.id AS suggestion_id, s.title, s.description, ss.name AS sub_specialty_name\n      FROM clinic_db.suggestions s\n      JOIN clinic_db.sub_specialties ss ON s.sub_specialty_id = ss.id\n      JOIN clinic_db.specialties sp ON ss.specialty_id = sp.id\n      WHERE sp.id = ?;\n    ", [specialtyId])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7);
                    throw new response_error_1.ResponseError.InternalServer("An unexpected error occurred.");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function filterServicesById(serviceId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("\n   SELECT \n      d.*, \n      COALESCE(ld.location, 'No Location') AS location,\n      s.name AS specialty_name,\n      (SELECT AVG(rating) \n       FROM ".concat(mysql_1.coreSchema, ".ratings r \n       WHERE r.id = d.id) AS average_rating\n    FROM \n      ").concat(mysql_1.coreSchema, ".doctors d\n    LEFT JOIN \n      ").concat(mysql_1.coreSchema, ".locations_doctors ld ON d.id = ld.id\n    LEFT JOIN \n      ").concat(mysql_1.coreSchema, ".specialties s ON d.specialty_id = s.id\n    JOIN \n      ").concat(mysql_1.coreSchema, ".services srv  ON srv.specialty_id = s.id\n    WHERE \n    srv.id = ?;\n    "), {
                        values: [serviceId],
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function existingFeedback(reviewData) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("SELECT * FROM ".concat(mysql_1.coreSchema, ".doctor_reviews WHERE user_id = ? AND doctor_id =?"), {
                        values: [reviewData.user_id, reviewData.doctor_id],
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function insertReviews(reviewData) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mysql_1.query)("INSERT INTO ".concat(mysql_1.coreSchema, ".doctor_reviews\n        (doctor_id,\n          user_id,\n          comment,\n          recommendations,\n          rating,\n          professional_demeanor,\n          sufficient_time,\n          skill,\n          staff_behavior,\n          clinic_condition)\n        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)"), {
                            values: [
                                reviewData.doctor_id,
                                reviewData.user_id,
                                reviewData.comment,
                                reviewData.rating,
                                reviewData.recommendations,
                                reviewData.ratings.professional_demeanor,
                                reviewData.ratings.sufficient_time,
                                reviewData.ratings.skill,
                                reviewData.ratings.staff_behavior,
                                reviewData.ratings.clinic_condition,
                            ],
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_8 = _a.sent();
                    console.log(error_8);
                    throw new response_error_1.ResponseError.InternalServer("Internal server Error");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getReviews() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mysql_1.query)("\n    SELECT * FROM ".concat(mysql_1.coreSchema, ".doctor_reviews\n    "))];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function doctorSchadules(doctor_id, consultatio_types_available) {
    return __awaiter(this, void 0, void 0, function () {
        var queryParams, queryStr, result, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryParams = [doctor_id];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    queryStr = "\n   SELECT * FROM ".concat(mysql_1.coreSchema, ".doctor_schedules ds\n      WHERE doctor_id = ?\n    ");
                    if (consultatio_types_available) {
                        queryStr += " AND ds.consultatio_types_available =?";
                        queryParams.push(consultatio_types_available);
                    }
                    return [4 /*yield*/, (0, mysql_1.query)(queryStr, {
                            values: queryParams,
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    error_9 = _a.sent();
                    console.log(error_9);
                    throw new response_error_1.ResponseError.InternalServer("Internal server Error");
                case 4: return [2 /*return*/];
            }
        });
    });
}
function doctorScheduleTimeAvailability(schedule_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, mysql_1.query)("\n      SELECT *\n      FROM ".concat(mysql_1.coreSchema, ".doctor_available_times \n      WHERE schedule_id = ?;\n      "), {
                            values: [schedule_id],
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_10 = _a.sent();
                    console.error(error_10); // Better to use console.error for errors
                    throw new response_error_1.ResponseError.InternalServer("Internal Server Error");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function booked(doctor_schedule_id, patient_id, clinic_id, appointment_date, appointment_time) {
    return __awaiter(this, void 0, void 0, function () {
        var existing, appointmentResult, error_11;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, (0, mysql_1.query)("SELECT is_booked FROM ".concat(mysql_1.coreSchema, ".doctor_available_times WHERE id = ? FOR UPDATE"), { values: [doctor_schedule_id] })];
                case 1:
                    existing = (_b.sent())[0];
                    if (!existing || ((_a = existing[0]) === null || _a === void 0 ? void 0 : _a.is_booked) === 1) {
                        throw new response_error_1.ResponseError.BadRequest("Doctor schedule is alreday boooked.");
                    }
                    return [4 /*yield*/, (0, mysql_1.query)("INSERT INTO ".concat(mysql_1.coreSchema, ".appointments\n      (patient_id,doctor_schedule_id,clinic_id,appointment_date,appointment_time,status)\n      VALUES (?, ?, ?, ?, ?, 'Scheduled');"), {
                            values: [
                                patient_id,
                                doctor_schedule_id,
                                clinic_id,
                                appointment_date,
                                appointment_time,
                            ],
                        })];
                case 2:
                    appointmentResult = _b.sent();
                    return [2 /*return*/, {
                            message: "Appointment successfuly booked",
                            appointmentId: appointmentResult.insertId,
                        }];
                case 3:
                    error_11 = _b.sent();
                    console.error(error_11);
                    throw new response_error_1.ResponseError.InternalServer("Internal Server Error");
                case 4:
                    console.log("final");
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
