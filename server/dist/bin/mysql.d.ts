import { ResultSetHeader, RowDataPacket } from 'mysql2';
import * as mysql from 'mysql2/promise';
import { PoolConnection } from 'mysql2/promise';
declare const coreSchema: string;
export { ResultSetHeader, RowDataPacket, coreSchema };
declare const pool: mysql.Pool;
export { pool, mysql };
export declare function query<T extends RowDataPacket[] | ResultSetHeader | any>(sql: string, options?: {
    connection?: PoolConnection;
    nestTables?: boolean;
    values?: any[] | any;
}, attempt?: number): Promise<T>;
