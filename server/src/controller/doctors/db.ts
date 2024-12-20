import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { DoctorsDTO, likeDTO } from "../../models/doctors";

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

export async function checkDoctorPhoneNumberExists(
  mobile: string
): Promise<any> {
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

export async function addDoctor(doctorInfo: DoctorsDTO): Promise<any> {
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
    `
  SELECT 
      d.*,
      COALESCE(ld.location, 'No Location') AS location,
      (SELECT AVG(r.rating) 
       FROM ${coreSchema}.ratings r 
       WHERE r.doctor_id = d.doctor_id) AS average_rating
    FROM 
      ${coreSchema}.doctors d
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

export async function getDoctorSpecializations(doctorId: number): Promise<any> {
  const result = await query<RowDataPacket>(
    `
    SELECT 
    d.name AS doctor_name,s.specialization_name
    FROM doctors d
    JOIN doctor_specializations ds ON d.doctor_id = ds.doctor_id
    JOIN specializations s ON ds.specialization_id = s.specialization_id
    WHERE d.doctor_id =1
    `,
    {
      values: [doctorId],
    }
  );
  return result;
}

export async function logDoctorClick(doctor_id: number): Promise<any> {
  const insertResult = await query<RowDataPacket>(
    `
    INSERT INTO ${coreSchema}.doctor_clicks (doctor_id)
    VALUES (?)
    `,
    {
      values: [doctor_id],
    }
  );

  const updateResult = await query<RowDataPacket>(
    `
    UPDATE ${coreSchema}.doctors
    SET click_count = click_count + 1
    WHERE doctor_id = ?
    `,
    {
      values: [doctor_id],
    }
  );

  return { insertResult, updateResult };
}

// export async function like(data: likeDTO) {
  
//   const result = query<RowDataPacket>(
//     `INSERT INTO ${coreSchema}.likes 
//       (user_id,entity_id,entity_type)
//       VALUES (?, ?, ?)
//       `,
//     { values: [data.user_id, data.entity_id, data.entity_type] }
//   );
//   return result;
// }






export async function like(data: likeDTO) {
  const existingLike = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.likes 
     WHERE user_id = ? AND entity_id = ? AND entity_type = ?`,
    {
      values: [data.user_id, data.entity_id, data.entity_type],
    }
  );

  if (existingLike.length > 0) {
    const deleteLike = await query<RowDataPacket>(
      `DELETE FROM ${coreSchema}.likes 
       WHERE user_id = ? AND entity_id = ? AND entity_type = ?`,
      {
        values: [data.user_id, data.entity_id, data.entity_type],
      }
    );
    return deleteLike; // return the result of deletion
  } else {
    // If the like doesn't exist, add it
    const insertLike = await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.likes (user_id, entity_id, entity_type) 
       VALUES (?, ?, ?)`,
      { values: [data.user_id, data.entity_id, data.entity_type] }
    );
    return insertLike; // return the result of insertion
  }
}
