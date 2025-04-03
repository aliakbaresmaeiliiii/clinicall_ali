import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { esClient } from "../../app";
import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import {
  CommentsDTO,
  DoctorsDTO,
  likeDTO,
  ReviewsDTO
} from "../../models/doctors";
import { ResponseError } from "../../modules/error/response_error";
import { doctorSchema } from "./schema";

// const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });


export async function getDoctorsFromElastic(filters: {
  name?: string;
  city_id?: string;
  service_id: string;
  specialty_id: string;
  insurance_id: string;
  patient_id: string;
  minRating?: number;
  doctor_id?: string;
  maxRating?: number;
  isPopular?: boolean;
}) {
  try {

    const must: any[] = [];

    if (filters.name) {
      must.push({ match: { name: filters.name } });
    }
    if (filters.doctor_id) {
      must.push({ term: { id: filters.doctor_id } });
    }
    if (filters.specialty_id) {
      must.push({ term: { specialty_id: filters.specialty_id } });
    }
    if (filters.patient_id) {
      must.push({ term: { patient_id: filters.patient_id } });
    }
    if (filters.service_id) {
      must.push({ term: { service_ids: filters.service_id } });
    }
    if (filters.insurance_id) {
      must.push({ term: { insurance_id: filters.insurance_id } });
    }
    if (filters.city_id) {
      must.push({ term: { "addresses.city_id": filters.city_id } });
    }
    if (filters.minRating !== undefined || filters.maxRating !== undefined) {
      must.push({
        range: {
          average_rating: {
            gte: filters.minRating ?? 0,
            lte: filters.maxRating ?? 5,
          },
        },
      });
    }
    if (filters.isPopular) {
      must.push({
        range: {
          average_rating: {
            gte: 4,
          },
        },
      });
    }

    const query = must.length > 0 ? { bool: { must } } : { match_all: {} };


    const response = await esClient.search({
      index: "doctors",
      body: {
        query,
      },
    });

    console.log("📊 Response:", JSON.stringify(response, null, 2));

    if (!response.hits || !response.hits.hits.length) {
      return [];
    }

    return response.hits.hits.map((hit: any) => hit._source);
  } catch (error: any) {
    console.log("❌ Elasticsearch error:", JSON.stringify(error.meta?.body || error, null, 2));
    return [];
  }
}


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

export async function getUserSuggestionPercentage(
  doctorId: number
): Promise<number> {
  const result = await query<RowDataPacket>(
    `SELECT COUNT(id) AS total_reviews,
      SUM(CASE WHEN recommendation = 1 THEN 1 ELSE 0 END) AS total_recommended
     FROM ${coreSchema}.doctor_reviews
     WHERE doctor_id = ?`,
    {
      values: [doctorId],
    }
  );
  if (!result.length || result[0].total_reviews === 0) return 0;

  return parseFloat(
    ((result[0].total_recommended / result[0].total_reviews) * 100).toFixed(2)
  );
}
export async function like(data: likeDTO) {
  const existingLike = await query<RowDataPacket>(
    `SELECT * FROM ${coreSchema}.doctor_likes 
     WHERE doctor_id = ? AND patient_id = ?`,
    {
      values: [data.doctor_id, data.patient_id],
    }
  );

  if (existingLike.length > 0) {
    // Unlike the doctor: Remove the like
    await query<RowDataPacket>(
      `DELETE FROM ${coreSchema}.doctor_likes 
       WHERE doctor_id = ? AND patient_id = ?`,
      {
        values: [data.doctor_id, data.patient_id],
      }
    );
  } else {
    // Like the doctor: Insert new like record
    await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.doctor_likes (doctor_id, patient_id, isLike) 
       VALUES (?, ?, ?)`,
      {
        values: [data.doctor_id, data.patient_id, 1],
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

export async function getDoctoLike(patient_id: number) {
  try {
    const result = await query<RowDataPacket>(
      `
      SELECT
      d.*
        FROM ${coreSchema}.doctor_likes dl
        LEFT JOIN ${coreSchema}.doctors d
        ON dl.doctor_id = d.id
        WHERE dl.patient_id = ?`,
      {
        values: [patient_id],
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("Failed to get response");
  }
}

export async function getServices() {
  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.services`
  );
  return result;
}

// export async function getMostPopularDoctors(): Promise<any> {
//   try {
//     const result = await query<RowDataPacket[]>(
//       `
//       SELECT
//         d.*,
//         COALESCE(ld.id, 'No Location') AS location,
//         s.name AS specialty_name,
//         (SELECT AVG(r.rating)
//          FROM ${coreSchema}.ratings r
//          WHERE r.id = d.id) AS average_rating,
//         (SELECT COUNT(r.rating)
//          FROM ${coreSchema}.ratings r
//          WHERE r.id = d.id) AS total_ratings
//       FROM
//         ${coreSchema}.doctors d
//       LEFT JOIN
//         ${coreSchema}.doctor_locations ld ON d.id = ld.id
//       LEFT JOIN
//         ${coreSchema}.specialties s ON d.specialty_id = s.id
//       HAVING
//         total_ratings > 3
//       ORDER BY
//         average_rating DESC,
//         total_ratings DESC
//       LIMIT 10;
//       `
//     );
//     return result;
//   } catch (error) {
//     console.log(error);
//     throw new ResponseError.InternalServer("An unexpected error occurred.");
//   }
// }

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
        ss.sub_specialty AS sub_specialty_name
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
      images: row.specialty_image || "default_image.jpeg",
    }));
  } catch (error) {
    console.error("Error fetching sub-specialties:", error);
    throw new ResponseError.InternalServer("An unexpected error occurred.");
  }
}

export async function filterSpecialtyById(specialty: any) {
  try {
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
        ${coreSchema}.doctor_locations ld ON d.id = ld.id
      LEFT JOIN 
        ${coreSchema}.specialties s ON d.specialty_id = s.id
  
      WHERE 
      s.id = ?;
      `,
      {
        values: [specialty],
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("...");
  }
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
      ${coreSchema}.specialties s ON d.specialty_id = s.id
    JOIN 
      ${coreSchema}.services srv  ON srv.specialty_id = s.id
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
    SELECT * FROM ${coreSchema}.doctor_reviews
    `
  );
  return result;
}

export async function doctorSchadules(
  doctor_id: number,
  consultatio_types_available?: string
) {
  const queryParams: any[] = [doctor_id];
  try {
    let queryStr = `
   SELECT * FROM ${coreSchema}.doctor_schedules ds
      WHERE doctor_id = ?
    `;

    if (consultatio_types_available) {
      queryStr += " AND ds.consultatio_types_available =?";
      queryParams.push(consultatio_types_available);
    }
    const result = await query<RowDataPacket[]>(queryStr, {
      values: queryParams,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new ResponseError.InternalServer("Internal server Error");
  }
}

export async function doctorScheduleTimeAvailability(schedule_id: number) {
  try {
    const result = await query<RowDataPacket[]>(
      `
      SELECT *
      FROM ${coreSchema}.doctor_available_times 
      WHERE schedule_id = ?;
      `,
      {
        values: [schedule_id],
      }
    );
    return result;
  } catch (error) {
    console.error(error); // Better to use console.error for errors
    throw new ResponseError.InternalServer("Internal Server Error");
  }
}

export async function booked(
  doctor_schedule_id: number,
  patient_id: number,
  clinic_id: number,
  appointment_date: string,
  appointment_time: string
) {
  try {
    const [existing] = await query<RowDataPacket[]>(
      `SELECT is_booked FROM ${coreSchema}.doctor_available_times WHERE id = ? FOR UPDATE`,
      { values: [doctor_schedule_id] }
    );

    if (!existing || existing[0]?.is_booked === 1) {
      throw new ResponseError.BadRequest("Doctor schedule is alreday boooked.");
    }

    const appointmentResult = await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.appointments
      (patient_id,doctor_schedule_id,clinic_id,appointment_date,appointment_time,status)
      VALUES (?, ?, ?, ?, ?, 'Scheduled');`,
      {
        values: [
          patient_id,
          doctor_schedule_id,
          clinic_id,
          appointment_date,
          appointment_time,
        ],
      }
    );
    return {
      message: "Appointment successfuly booked",
      appointmentId: appointmentResult.insertId,
    };
  } catch (error) {
    console.error(error);
    throw new ResponseError.InternalServer("Internal Server Error");
  } finally {
    console.log("final");
  }
}
