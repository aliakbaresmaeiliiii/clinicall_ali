import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { DoctorsDTO } from "../../models/doctors";

// export async function getDoctors(): Promise<DoctorsDTO[]> {
//   const doctors = await query<RowDataPacket[]>(`
//       SELECT * FROM ${coreSchema}.doctors`);
//   return doctors as DoctorsDTO[];
// }

export async function getDoctors(): Promise<any> {
  const result = await query<RowDataPacket>(
    `
   SELECT 
  d.*, 
  COALESCE(ld.location, 'No Location') AS location,
  (SELECT AVG(rating) 
   FROM ${coreSchema}.ratings r 
   WHERE r.doctor_id = d.doctor_id) AS average_rating
FROM 
  ${coreSchema}.doctors d
LEFT JOIN 
  ${coreSchema}.locations_doctors ld ON d.doctor_id = ld.doctor_id;
      `
  );
  return result;
}

export async function getMostPopularDoctors(): Promise<any> {
  const result = await query<RowDataPacket[]>(
    `
    SELECT 
      d.doctor_id AS doctor_id,
      d.name AS name,
      d.mobile AS mobile,
      d.email AS email,
      d.profileImage AS profileImage,
      d.address AS address,
      AVG(r.rating) AS average_rating,
      COUNT(r.rating) AS total_ratings
    FROM 
      ${coreSchema}.doctors d
    INNER JOIN 
      ${coreSchema}.ratings r ON d.doctor_id = r.doctor_id
    GROUP BY 
      d.doctor_id, d.name, d.mobile, d.email
    HAVING 
      COUNT(r.rating) > 2
    ORDER BY 
      average_rating DESC,
      total_ratings DESC
    LIMIT 10;
    `
  );
  return result;
}

export async function checkDoctorPhoneNumberExists(mobile: string) {
  const result = await query<RowDataPacket>(
    `
      SELECT mobile FROM ${coreSchema}.doctors
      where mobile=?
      `,
    {
      values: [mobile],
    }
  );
  return result;
}

export async function addDoctor(doctorInfo: DoctorsDTO) {
  try {
    const result = await query<RowDataPacket[]>(
      `INSERT INTO ${coreSchema}.doctors
        (name,gender,mobile,degree,dateOfBirth,department,
         age,email,address,profileImage,specialization,joingin_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        values: [
          doctorInfo.name,
          doctorInfo.gender,
          doctorInfo.mobile,
          doctorInfo.degree,
          doctorInfo.dateOfBirth,
          doctorInfo.department,
          doctorInfo.age,
          doctorInfo.email,
          doctorInfo.address,
          doctorInfo.profileImage,
          doctorInfo.specialization,
          new Date(),
        ],
      }
    );
    return result;
  } catch (error) {
    console.log();
    console.error("Error inserting doctor data:", error);
    throw error;
  }
}

export async function doctorDetail(doctorId: number): Promise<any> {
  const result = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.doctors d
      LEFT JOIN 
      ${coreSchema}.locations_doctors ld ON d.doctor_id = ld.doctor_id
       WHERE 
      d.doctor_id = ?;
  `,
    { values: [doctorId] }
  );
  return result;
}

export async function updateDoctor(doctorData: DoctorsDTO): Promise<any> {
  const result = await query<RowDataPacket>(
    `
        UPDATE ${coreSchema}.doctors
        SET name = ?
        WHERE doctor_id = ?
      `,
    {
      values: [doctorData.name, doctorData.doctor_id],
    }
  );
  return result;
}
