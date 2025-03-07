import { coreSchema, query, RowDataPacket } from "../../bin/mysql";

export async function getAllInsurances() {
    const result = await query<RowDataPacket[]>(
      `SELECT * FROM ${coreSchema}.insurances`
    );
    return result;
  }