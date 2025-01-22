import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import {
  CommentsDTO,
  DoctorsDTO,
  likeDTO,
  ReviewsDTO,
} from "../../models/doctors";

export async function getDoctors(): Promise<DoctorsDTO[] | null> {
  const sql = `
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
      ${coreSchema}.specialities s ON d.speciality_id = s.id
  `;

  const result = await query<RowDataPacket[]>(sql);
  return result as DoctorsDTO[];
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
      ${coreSchema}.specialities s ON d.speciality_id = s.id
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
        (name,gender,contact_info,degree,dateOfBirth,department,
         age,email,address,profileImage,specialization,joingin_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    {
      values: [
        doctorInfo.name,
        doctorInfo.gender,
        doctorInfo.contact_info,
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
      ${coreSchema}.specialities s ON d.speciality_id = s.id
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
    `SELECT *
       FROM ${coreSchema}.specialities`
  );
  return result;
}

export async function filterSpecialtyById(specialty: any) {
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
      ${coreSchema}.specialities s ON d.speciality_id = s.id

    WHERE 
    s.id = ?;
    `,
    {
      values: [specialty],
    }
  );
  return result;
}
export async function filterServicesById(serviceId: number) {
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
      ${coreSchema}.specialities s ON d.speciality_id = s.id
    JOIN 
      ${coreSchema}.services srv  ON srv.speciality_id = s.id
    WHERE 
    srv.id = ?;
    `,
    {
      values: [serviceId],
    }
  );
  return result;
}

export async function existingFeedback(reviewData: ReviewsDTO) {
  const result = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.reviews WHERE doctor_id = ? AND user_id =?`,
    {
      values: [reviewData.doctor_id, reviewData.user_id],
    }
  );
  return result;
}

export async function insertReviews(reviewData: ReviewsDTO) {
  const result = await query<RowDataPacket>(
    `INSERT INTO ${coreSchema}.reviews
  (doctor_id,
    user_id,
    comment,
    recommendation,
    rating,
    professional_demeanor,
    sufficient_time,
    skill,
    staff_behavior,
    clinic_condition)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
    {
      values: [
        reviewData.doctor_id,
        reviewData.user_id,
        reviewData.comment,
        reviewData.rating,
        reviewData.recommendation,
        reviewData.ratings.professional_demeanor,
        reviewData.ratings.sufficient_time,
        reviewData.ratings.skill,
        reviewData.ratings.staff_behavior,
        reviewData.ratings.clinic_condition,
      ],
    }
  );
  return result;
}

export async function doctorScheduleAvailability(
  doctor_id: number,
  ConsultationTypesAvailable: string
) {
  const result = await query<RowDataPacket>(
    `
    SELECT
        ds.scheduleID,
        ds.availableDate,
        ds.ConsultationTypesAvailable
    FROM
      ${coreSchema}.doctor_schedules ds
        WHERE
        ds.doctor_id = ?
        AND FIND_IN_SET(?, ds.ConsultationTypesAvailable) > 0
    `,
    {
      values: [doctor_id, ConsultationTypesAvailable],
    }
  );
  return result;
}

export async function doctorScheduleTimeAvailability(scheduleID: number) {
  const result = await query<RowDataPacket[]>(
    `
    SELECT 
       dat.availableTime,
       dat.isBooked,
       dat.timeID
       FROM 
        ${coreSchema}.doctor_schedules ds
      JOIN 
        ${coreSchema}.doctor_available_times dat
      ON
        ds.scheduleID = dat.scheduleID
      WHERE 
        ds.scheduleID = ?;
    `,
    {
      values: [scheduleID],
    }
  );
  return result;
}

export async function booked(timeID: number) {
  const result = query<RowDataPacket>(
    `
    UPDATE ${coreSchema}.doctor_available_times
      SET isBooked = 1
      WHERE timeID = ?;
    `,
    {
      values: [timeID],
    }
  );
  return result;
}
