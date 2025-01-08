import { coreSchema, query, RowDataPacket } from "../../bin/mysql";

export async function getAllCities() {
  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.cities`
  );
  return result;
}

export async function GetNeighborhoods(city_id: number) {
  const adjustedCityId = city_id + 1;
  const result = await query<RowDataPacket[]>(
    `
     SELECT * FROM ${coreSchema}.filtered_neighborhoods
     WHERE city_id = ?
    `,
    {
      values: [adjustedCityId],
    }
  );
  return result;
}
