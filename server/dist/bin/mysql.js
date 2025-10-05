"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysql = exports.pool = exports.coreSchema = void 0;
exports.query = query;
const dotenv = __importStar(require("dotenv"));
const mysql = __importStar(require("mysql2/promise"));
exports.mysql = mysql;
dotenv.config();
const coreSchema = process.env.DB_DATABASE;
exports.coreSchema = coreSchema;
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 50,
    queueLimit: 0,
    charset: 'utf8',
    timezone: process.env.DB_TIMEZONE,
});
exports.pool = pool;
pool.on('connection', (connection) => {
    connection.config.namedPlaceholders = true;
});
async function query(sql, options = {}, attempt = 0) {
    const useExternalConnection = Boolean(options.connection);
    const connection = options.connection || (await pool.getConnection());
    let result;
    let sqlQuery = sql;
    try {
        sqlQuery = connection.format(sql, options.values);
        [result] = await connection.query({
            sql,
            values: options.values,
            nestTables: options.nestTables,
        });
        if (!result) {
            result = [];
        }
    }
    catch (e) {
        e.message = `${e.code}\nsql: ${sqlQuery}\nerror: ${e.message}\ntime: }`;
        throw e;
    }
    finally {
        if (!useExternalConnection) {
            connection.release();
        }
    }
    return result;
}
//# sourceMappingURL=mysql.js.map