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
exports.mysql = exports.pool = exports.coreSchema = void 0;
exports.query = query;
var dotenv = require("dotenv");
var mysql = require("mysql2/promise");
exports.mysql = mysql;
dotenv.config();
var coreSchema = process.env.DB_DATABASE;
exports.coreSchema = coreSchema;
var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 50,
    queueLimit: 0,
    charset: "utf8",
    timezone: process.env.DB_TIMEZONE,
});
exports.pool = pool;
pool.on("connection", function (connection) {
    connection.config.namedPlaceholders = true;
});
function query(sql_1) {
    return __awaiter(this, arguments, void 0, function (sql, options, attempt) {
        var useExternalConnection, connection, _a, result, sqlQuery, e_1;
        if (options === void 0) { options = {}; }
        if (attempt === void 0) { attempt = 0; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    useExternalConnection = Boolean(options.connection);
                    _a = options.connection;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, pool.getConnection()];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    connection = _a;
                    sqlQuery = sql;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, 6, 7]);
                    sqlQuery = connection.format(sql, options.values);
                    return [4 /*yield*/, connection.query({
                            sql: sql,
                            values: options.values,
                            nestTables: options.nestTables,
                        })];
                case 4:
                    result = (_b.sent())[0];
                    if (!result) {
                        result = [];
                    }
                    return [3 /*break*/, 7];
                case 5:
                    e_1 = _b.sent();
                    e_1.message = "".concat(e_1.code, "\nsql: ").concat(sqlQuery, "\nerror: ").concat(e_1.message, "\ntime: }");
                    throw e_1;
                case 6:
                    if (!useExternalConnection) {
                        connection.release();
                    }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/, result];
            }
        });
    });
}
