import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import {
  CommentsDTO,
  DoctorsDTO,
  likeDTO,
  ReviewsDTO,
  SubSpecialty,
} from "../../models/doctors";
import { ResponseError } from "../../modules/error/response_error";
import { doctorSchema } from "./schema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function addDoctor(data: DoctorsDTO) {
  const { password } = data.password;
  const { confirmPassword } = data.password;

  const fdPassword = { password, confirmPassword };
  const validPassword = doctorSchema.validateSyncAt(
    "confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(validPassword, saltRounds);

  if (validPassword.error) {
    throw new ResponseError.Unauthorized("Password is invalid");
  }
  const newId = uuidv4();

  try {
    const result = await query<RowDataPacket[]>(
      `INSERT INTO ${coreSchema}.doctors
        (id,first_name,last_name,email,password,token_verify,verify_code,phone,created_at,updated_at)
        VALUES(?,?,?,?,?,?,?,?,?,?)`,
      {
        values: [
          newId,
          data.first_name,
          data.last_name,
          data.email,
          hashedPassword,
          data.token_verify,
          data.verify_code,
          data.phone,
          new Date(),
          new Date(),
        ],
      }
    );
    return result;
  } catch (error: any) {
    console.error("Database Error:", error.message);
    throw new ResponseError.InternalServer("Failed to insert clinic.");
  }
}

export async function like(data: likeDTO) {
  const existingLike = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.doctor_likes 
     WHERE doctor_id = ? AND user_id = ?`,
    {
      values: [data.doctor_id, data.user_id],
    }
  );

  if (existingLike.length > 0) {
    // Unlike the doctor: Remove the like
    await query<RowDataPacket>(
      `DELETE FROM ${coreSchema}.doctor_likes 
       WHERE doctor_id = ? AND user_id = ?`,
      {
        values: [data.doctor_id, data.user_id],
      }
    );
  } else {
    // Like the doctor: Insert new like record
    await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.doctor_likes (doctor_id, user_id, isLike) 
       VALUES (?, ?, ?)`,
      {
        values: [data.doctor_id, data.user_id, 1],
      }
    );
  }

  // Update the doctor's is_liked status based on the total likes
  const totalLikes = await query<RowDataPacket>(
    `SELECT COUNT(*) AS count FROM ${coreSchema}.doctor_likes 
     WHERE doctor_id = ?`,
    {
      values: [data.doctor_id],
    }
  );

  const isLiked = totalLikes[0].count > 0 ? 1 : 0;

  await query<RowDataPacket>(
    `UPDATE ${coreSchema}.doctors 
     SET is_liked = ? 
     WHERE id = ?`,
    {
      values: [isLiked, data.doctor_id],
    }
  );

  return { success: true, isLiked };
}

export async function getDoctors(): Promise<DoctorsDTO[] | null> {
  try {
    const sql = `
    SELECT 
      d.*,
      COALESCE(ld.city, 'No City') AS city,
      COALESCE(ld.state, '') AS state,
      COALESCE(ld.country, '') AS country,
      COALESCE(ld.latitude, 0) AS latitude,
      COALESCE(ld.longitude, 0) AS longitude,
      COALESCE(ld.address_line1, '') AS address_line1,
      COALESCE(ld.address_line2, '') AS address_line2,
      COALESCE(ld.zipcode, '') AS zipcode,

    (SELECT AVG(rating) 
      FROM ${coreSchema}.doctor_reviews r 
        WHERE r.doctor_id = d.id) AS average_rating,
        COUNT(r.id) AS total_reviews,
        COALESCE(AVG(r.professional_demeanor), 0) AS avg_professional_demeanor,
        COALESCE(AVG(r.sufficient_time), 0) AS avg_sufficient_time,
        COALESCE(AVG(r.skill), 0) AS avg_skill,
        COALESCE(AVG(r.staff_behavior), 0) AS avg_staff_behavior,
        COALESCE(AVG(r.clinic_condition), 0) AS avg_clinic_condition,
          CASE 
        WHEN EXISTS (SELECT 1 FROM ${coreSchema}.doctor_likes dl WHERE dl.doctor_id = d.id) 
        THEN 1 ELSE 0
      END AS isLiked
         FROM 
      ${coreSchema}.doctors d
    LEFT JOIN 
      ${coreSchema}.doctor_locations ld ON d.id = ld.doctor_id AND ld.is_primary = 1
    LEFT JOIN 
      ${coreSchema}.specialties s ON d.speciality_id = s.id
    LEFT JOIN 
      ${coreSchema}.doctor_reviews r ON d.id = r.doctor_id
    GROUP BY d.id, ld.city, ld.state, ld.country, ld.latitude, ld.longitude, 
             ld.address_line1, ld.address_line2, ld.zipcode
  `;

    const result = await query<RowDataPacket[]>(sql);
    return result as DoctorsDTO[];
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("An unexpected error occurred.");
  }
}

export async function getMostPopularDoctors(): Promise<any> {
  try {
    const result = await query<RowDataPacket[]>(
      `
      SELECT 
        d.*, 
        COALESCE(ld.id, 'No Location') AS location,
        s.name AS specialty_name,
        (SELECT AVG(r.rating) 
         FROM ${coreSchema}.ratings r 
         WHERE r.id = d.id) AS average_rating,
        (SELECT COUNT(r.rating) 
         FROM ${coreSchema}.ratings r 
         WHERE r.id = d.id) AS total_ratings
      FROM 
        ${coreSchema}.doctors d
      LEFT JOIN 
        ${coreSchema}.doctor_locations ld ON d.id = ld.id
      LEFT JOIN 
        ${coreSchema}.specialties s ON d.speciality_id = s.id
      HAVING 
        total_ratings > 3
      ORDER BY 
        average_rating DESC,
        total_ratings DESC
      LIMIT 10;
      `
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("An unexpected error occurred.");
  }
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

// export async function addDoctor(doctorInfo: DoctorsDTO): Promise<any> {
//   const result = await query<RowDataPacket[]>(
//     `INSERT INTO ${coreSchema}.doctors
//         (name,gender,contact_info,degree,dateOfBirth,department,
//          age,email,address,profileImage,specialization,joingin_date)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     {
//       values: [
//         doctorInfo.name,
//         doctorInfo.gender,
//         doctorInfo.contact_info,
//         doctorInfo.degree,
//         doctorInfo.dateOfBirth,
//         doctorInfo.department,
//         doctorInfo.age,
//         doctorInfo.email,
//         doctorInfo.address,
//         doctorInfo.profileImage,
//         doctorInfo.specialty_name,
//         new Date(),
//       ],
//     }
//   );
//   return result;
// }

export async function doctorDetail(doctorId: number): Promise<any> {
  try {
    const result = await query<RowDataPacket>(
      `
       SELECT 
      d.*, 
        COALESCE(ld.city, 'No City') AS city,
        COALESCE(ld.state, '') AS state,
        COALESCE(ld.country, '') AS country,
        COALESCE(ld.latitude, 0) AS latitude,
        COALESCE(ld.longitude, 0) AS longitude,
        COALESCE(ld.address_line1, '') AS address_line1,
        COALESCE(ld.address_line2, '') AS address_line2,
        COALESCE(ld.state, '') AS state,
        COALESCE(ld.zipcode, '') AS zipcode,
        COALESCE(ld.country, '') AS country,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        COALESCE(AVG(r.professional_demeanor), 0) AS avg_professional_demeanor,
        COALESCE(AVG(r.sufficient_time), 0) AS avg_sufficient_time,
        COALESCE(AVG(r.skill), 0) AS avg_skill,
        COALESCE(AVG(r.staff_behavior), 0) AS avg_staff_behavior,
        COALESCE(AVG(r.clinic_condition), 0) AS avg_clinic_condition,
        COUNT(r.id) AS total_reviews,
        COALESCE(GROUP_CONCAT(DISTINCT r.comment SEPARATOR ' | '), 'No comments') AS comments,
        s.name AS specialty_name,
      (SELECT AVG(rating) 
        FROM ${coreSchema}.doctor_reviews r 
        WHERE r.doctor_id = d.id) AS average_rating,
      CASE 
        WHEN EXISTS (SELECT 1 FROM ${coreSchema}.doctor_likes dl WHERE dl.doctor_id = d.id) 
        THEN 1 ELSE 0
      END AS isLiked
    FROM 
      ${coreSchema}.doctors d
    LEFT JOIN 
      ${coreSchema}.doctor_locations ld ON d.id = ld.doctor_id AND ld.is_primary = 1
          LEFT JOIN 
      ${coreSchema}.doctor_reviews r ON d.id = r.doctor_id
    LEFT JOIN 
      ${coreSchema}.specialties s ON d.speciality_id = s.id
      WHERE 
         d.id = ?
      `,

      { values: [doctorId] }
    );
    if (!result || result.length === 0) {
      return { message: "Doctor not found" };
    }
    return result;
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    throw new ResponseError.InternalServer("An unexpected error occurred.");
  }
}

export async function updateDoctor(doctorData: DoctorsDTO): Promise<any> {
  const result = await query<RowDataPacket>(
    `
        UPDATE ${coreSchema}.doctors
        SET name = ?
        WHERE id = ?
      `,
    {
      values: [doctorData.first_name, doctorData.id],
    }
  );
  return result;
}

export async function recordDoctorProfileView(id: any) {
  try {
    const updateResult = await query<RowDataPacket>(
      `
      UPDATE ${coreSchema}.doctors
      SET click_count = click_count + 1
      WHERE id = ?
      `,
      {
        values: [id],
      }
    );
    return updateResult;
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("An unexpected error occurred.");
  }
}

export async function addComment(comment: CommentsDTO) {
  const result = await query<RowDataPacket>(
    `INSERT INTO ${coreSchema}.comments
     (id, id, comment_text, rating)
         VALUES (?, ?, ?, ?)`,
    {
      values: [comment.id, comment.id, comment.comment_text, comment.rating],
    }
  );
  return result;
}

export async function getSpecialties() {
  const result = await query<RowDataPacket[]>(
    `SELECT *
       FROM ${coreSchema}.specialties`
  );
  return result;
}
export async function getSubSpecialtiesById(specialtyId: number) {
  try {
    const limit = 20; // Default limit
    const offset = 0; // Default offset
    const result = await query<RowDataPacket[]>(
      `SELECT 
      s.id AS specialty_id,
      s.name AS specialty_name,
      s.images AS specialty_image,
      ss.id AS sub_specialty_id,
      ss.name AS sub_specialty_name,
      ss.image_url AS sub_specialty_image
    FROM ${coreSchema}.specialties s
    LEFT JOIN ${coreSchema}.sub_specialties ss 
    ON s.id = ss.specialty_id
    WHERE s.id = ? 
    ORDER BY ss.id;`,
      { values: [specialtyId] }
    );
    return result.map((row) => ({
      id: row.sub_specialty_id || null,
      name: row.sub_specialty_name || "N/A",
      images: row.sub_specialty_image || "default_image.jpeg",
    }));
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("An unexpected error occurred.");
  }
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
       WHERE r.id = d.id) AS average_rating
    FROM 
      ${coreSchema}.doctors d
    LEFT JOIN 
      ${coreSchema}.locations_doctors ld ON d.id = ld.id
    LEFT JOIN 
      ${coreSchema}.specialties s ON d.speciality_id = s.id

    WHERE 
    s.id = ?;
    `,
    {
      values: [specialty],
    }
  );
  return result;
}

export async function getSuggestionsBySpecialty(specialtyId: number) {
  try {
    const result = await query<RowDataPacket[]>(
      `
      SELECT s.id AS suggestion_id, s.title, s.description, ss.name AS sub_specialty_name
      FROM clinic_db.suggestions s
      JOIN clinic_db.sub_specialties ss ON s.sub_specialty_id = ss.id
      JOIN clinic_db.specialties sp ON ss.specialty_id = sp.id
      WHERE sp.id = ?;
    `,
      [specialtyId]
    );

    return result;
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("An unexpected error occurred.");
  }
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
       WHERE r.id = d.id) AS average_rating
    FROM 
      ${coreSchema}.doctors d
    LEFT JOIN 
      ${coreSchema}.locations_doctors ld ON d.id = ld.id
    LEFT JOIN 
      ${coreSchema}.specialties s ON d.speciality_id = s.id
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
    `SELECT * FROM ${coreSchema}.doctor_reviews WHERE user_id = ? AND doctor_id =?`,
    {
      values: [reviewData.user_id, reviewData.doctor_id],
    }
  );
  return result;
}

export async function insertReviews(reviewData: ReviewsDTO) {
  try {
    const result = await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.doctor_reviews
        (doctor_id,
          user_id,
          comment,
          recommendations,
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
          reviewData.recommendations,
          reviewData.ratings.professional_demeanor,
          reviewData.ratings.sufficient_time,
          reviewData.ratings.skill,
          reviewData.ratings.staff_behavior,
          reviewData.ratings.clinic_condition,
        ],
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("Internal server Error");
  }
}

export async function getReviews() {
  const result = await query<RowDataPacket[]>(
    `
    SELECT * FROM ${coreSchema}.reviews
    `
  );
  return result;
}

export async function doctorScheduleAvailability(
  id: number,
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
        ds.id = ?
        AND FIND_IN_SET(?, ds.ConsultationTypesAvailable) > 0
    `,
    {
      values: [id, ConsultationTypesAvailable],
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
