import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { CommentsDTO, DoctorsDTO, likeDTO } from "../../models/doctors";

export async function getDoctors(): Promise<any> {
  const result = await query<RowDataPacket>(
    `
   SELECT 
  d.*, 
  COALESCE(ld.location, 'No Location') AS location,
  s.name AS specialty_name,
  (SELECT AVG(rating) 
   FROM ${coreSchema}.ratings r 
   WHERE r.doctor_id = d.doctor_id) AS average_rating
   FROM 
  ${coreSchema}.doctors d
  LEFT JOIN 
  ${coreSchema}.locations_doctors ld ON d.doctor_id = ld.doctor_id
  LEFT JOIN 
  ${coreSchema}.specialties s ON d.specialty_id = s.id;
      `
  );
  return result;
}

export async function getMostPopularDoctors(): Promise<any> {
  const result = await query<RowDataPacket[]>(
    `
    SELECT 
      d.*, 
      COALESCE(ld.location, 'No Location') AS location,
      s.name AS specialty_name,
      (SELECT AVG(r.rating) 
       FROM ${coreSchema}.ratings r 
       WHERE r.doctor_id = d.doctor_id) AS average_rating,
      (SELECT COUNT(r.rating) 
       FROM ${coreSchema}.ratings r 
       WHERE r.doctor_id = d.doctor_id) AS total_ratings
    FROM 
      ${coreSchema}.doctors d
    LEFT JOIN 
      ${coreSchema}.locations_doctors ld ON d.doctor_id = ld.doctor_id
    LEFT JOIN 
      ${coreSchema}.specialties s ON d.specialty_id = s.id
    HAVING 
      total_ratings > 3
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
        doctorInfo.specialty_name,
        new Date(),
      ],
    }
  );
  return result;
}

export async function doctorDetail(doctorId: number): Promise<any> {
  const result = await query<RowDataPacket>(
    `
    SELECT 
      d.*,
      COALESCE(ld.location, 'No Location') AS location,
      (SELECT AVG(r.rating) 
       FROM ${coreSchema}.ratings r 
       WHERE r.doctor_id = d.doctor_id) AS average_rating,
      s.name AS specialty_name,
      c.comment AS comment
    FROM 
      ${coreSchema}.doctors d
    LEFT JOIN 
      ${coreSchema}.locations_doctors ld ON d.doctor_id = ld.doctor_id
    LEFT JOIN 
      ${coreSchema}.specialties s ON d.specialty_id = s.id
    LEFT JOIN 
      ${coreSchema}.comments c ON d.doctor_id = c.rating_id
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

export async function like(data: likeDTO) {
  const existingLike = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.likes 
     WHERE user_id = ? AND doctor_id = ? AND entity_type = ?`,
    {
      values: [data.user_id, data.doctor_id, data.entity_type],
    }
  );

  if (existingLike.length > 0) {
    const changeStatusLike = await query<RowDataPacket>(
      ` UPDATE ${coreSchema}.doctors
        SET is_liked = 0
        WHERE doctor_id = ? `,
      { values: [data.doctor_id] }
    );
    const deleteLike = await query<RowDataPacket>(
      `DELETE FROM ${coreSchema}.likes 
      WHERE user_id = ? AND doctor_id = ? AND entity_type = ?`,
      {
        values: [data.user_id, data.doctor_id, data.entity_type],
      }
    );
    return { deleteLike, changeStatusLike }; // return the result of deletion
  } else {
    const changeStatusLike = await query<RowDataPacket>(
      ` UPDATE ${coreSchema}.doctors
      SET is_liked = 1
      WHERE doctor_id = ? `,
      { values: [data.doctor_id] }
    );
    // If the like doesn't exist, add it
    const insertLike = await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.likes (user_id, doctor_id, entity_type) 
       VALUES (?, ?, ?)`,
      { values: [data.user_id, data.doctor_id, data.entity_type] }
    );
    return { insertLike, changeStatusLike }; // return the result of insertion
  }
}

export async function addComment(comment: CommentsDTO) {
  const result = await query<RowDataPacket>(
    `INSERT INTO ${coreSchema}.comments
     (user_id, doctor_id, comment_text, rating)
         VALUES (?, ?, ?, ?)`,
    {
      values: [
        comment.user_id,
        comment.doctor_id,
        comment.comment_text,
        comment.rating,
      ],
    }
  );
  return result;
}

export async function getSpecialties() {
  const result = query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.specialties`
  );
  return result;
}

export async function filterSpeciality(value: any) {
  const result = await query<RowDataPacket>(
    `
    SELECT ${coreSchema}.doctors.*
    FROM ${coreSchema}.doctors
    INNER JOIN ${coreSchema}.specialties ON doctors.specialty_id = specialties.id
    WHERE specialties.name = ?
    `,
    {
      values: [value],
    }
  );
  return result;
}
