import { coreSchema, query, RowDataPacket } from "../../bin/mysql";

export async function getAllCountries() {
  const data = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.countries`
  );
  return data;
}
