import { RowDataPacket } from "mysql2";
import { coreSchema, query } from "../../bin/mysql";

export async function getClinicServices() {
  const result = await query<RowDataPacket>(`SELECT 
     * FROM ${coreSchema}.services
    `);
  return result;
}
