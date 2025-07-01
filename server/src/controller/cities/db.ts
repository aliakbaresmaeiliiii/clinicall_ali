import { coreSchema, query, RowDataPacket } from "../../bin/mysql";

export async function getAllCitiesByFilter(filter: any) {
  let queryStr = `SELECT * FROM ${coreSchema}.cities`;
  const parmas: any[] = [];
  const conditions: string[] = [];

  if (filter.countryId) {
    conditions.push(`country_id =?`);
    parmas.push(filter.countryId);
  }

  if(filter.name){
    conditions.push(`LOWER(name) LIKE ?`)
    parmas.push(``)

  }

  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.cities`
  );
  return result;
}

export async function GetNeighborhoods(city_id: number) {
  const adjustedCityId = city_id + 1;
  const result = await query<RowDataPacket[]>(
    `
     SELECT * FROM ${coreSchema}.neighborhoods
     WHERE city_id = ?
    `,
    {
      values: [adjustedCityId],
    }
  );
  return result;
}
