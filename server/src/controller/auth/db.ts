import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { ResponseError } from "../../modules/error/response_error";

export async function checkIfClinicExists(email: string): Promise<boolean> {
  const result = await query<RowDataPacket[]>(
    `
    SELECT 1 FROM ${coreSchema}.clinic WHERE email = ? 
  `,
    {
      values: [email],
    }
  );
  return result.length > 0;
}

// export async function confirmDoctorEmail(data: ConfirmEmail) {
//   try {
//     const emailExists = await checkIfEmailExists(data.email);
//     if (!emailExists) {
//       return null; // Email not found
//     }

//     const [doctor] = await query<RowDataPacket[]>(
//       `SELECT id FROM ${coreSchema}.doctor WHERE email =? AND verify_code =?`,
//       { values: [data.email, data.verify_code] }
//     );
//     if (!doctor) {
//       return null;
//     }

//     const resultDoctor = await query<RowDataPacket[]>(
//       `UPDATE ${coreSchema}.doctor SET signup_status=?, updated_at=? WHERE email =?`,
//       { values: [1, new Date(), data.email] }
//     );

//     return resultDoctor;
//   } catch (error) {
//     console.error("Error confirming doctor email:", error);
//     throw new ResponseError.BadRequest("Failed to confirm doctor email");
//   }
// }

// export async function confirmClinicEmail(data: ConfirmEmail) {
//   try {
//     const emailExists = await checkIfEmailExists(data.email);
//     if (!emailExists) {
//       throw new ResponseError.NotFound("Email not found");
//     }

//     // Check if clinic exists with correct verify_code
//     const checkExistClinicVerifyCode = await query<RowDataPacket[]>(
//       `SELECT * FROM ${coreSchema}.clinic WHERE email = ?`,
//       {
//         values: [data.email],
//       }
//     );

//     if (checkExistClinicVerifyCode[0].verify_code !== data.verify_code) {
//       throw new ResponseError.BadRequest("Invalid verification code");
//     } else {
//       await query<RowDataPacket[]>(
//         `UPDATE ${coreSchema}.clinic SET signup_status=?, updated_at=? WHERE email=?`,
//         {
//           values: [1, new Date(), data.email],
//         }
//       );
//     }

//     return { success: true, message: "Email confirmation successful" };
//   } catch (error) {
//     return error;
//   }
// }

export async function getClinicByPassword(
  email: string,
  password: string
): Promise<any> {
  try {
    const user = await query<RowDataPacket[]>(
      // ` SELECT u.*, r.*,p.*
      // LEFT JOIN ${coreSchema}.user_roles ur ON u.id = ur.id
      // LEFT JOIN ${coreSchema}.roles r ON ur.role_id = r.id
      // LEFT JOIN ${coreSchema}.role_permissions rp ON r.id = rp.role_id
      // LEFT JOIN ${coreSchema}.permissions p ON rp.permission_id  = p.id
      ` SELECT *
      FROM ${coreSchema}.clinic 
      WHERE email = ?`,
      {
        values: [email],
      }
    );
    return user;
  } catch (error) {
    console.log(error)
  }
 
}
export async function getDoctorByPassword(
  email: string,
  password: string
): Promise<any> {
  const user = await query<RowDataPacket[]>(
    // ` SELECT u.*, r.*,p.*
    // LEFT JOIN ${coreSchema}.user_roles ur ON u.id = ur.id
    // LEFT JOIN ${coreSchema}.roles r ON ur.role_id = r.id
    // LEFT JOIN ${coreSchema}.role_permissions rp ON r.id = rp.role_id
    // LEFT JOIN ${coreSchema}.permissions p ON rp.permission_id  = p.id
    ` SELECT *
    FROM ${coreSchema}.patient 
    WHERE email = ?`,
    {
      values: [email],
    }
  );
  return user;
}

export async function getPatientByPassword(
  email: string,
  password: string
): Promise<any> {
  const user = await query<RowDataPacket[]>(
    ` SELECT *
    FROM ${coreSchema}.patient 
    WHERE email = ?`,
    {
      values: [email],
    }
  );
  return user;
}

// *****getClinicVerificationCode*****
export async function getClinicVerificationCode(clinicData: {
  email: string;
  verify_code: string;
}): Promise<any> {
  // Fetch the clinic data
  const [rows] = await query<RowDataPacket[]>(
    `SELECT email,verify_code FROM ${coreSchema}.clinic WHERE email = ? LIMIT 1`,
    {
      values: [clinicData.email],
    }
  );

  if (!rows || rows.length === 0) {
    console.error("❌ Email not found in database:", clinicData.email);
    throw new ResponseError.BadRequest("The verification code is incorrect!");
  }

  const storedVerifyCode = rows.verify_code;
  console.log(
    `🔍 Stored Code: ${storedVerifyCode}, Provided Code: ${clinicData.verify_code}`
  );

  if (storedVerifyCode !== clinicData.verify_code) {
    console.error("❌ Verification code mismatch!");
    throw new ResponseError.BadRequest("The verification code is incorrect!");
  }

  // Update the signup_status
  await query(
    `UPDATE ${coreSchema}.clinic SET signup_status = 1 WHERE email = ?`,
    { values: [clinicData.email] }
  );

  return rows; 
}

// *****getPatientVerificationCode*****
export async function getPatientVerificationCode(patientData: {
  email: string;
  verify_code: string;
}): Promise<any> {
  // Fetch the patient data
  const [rows] = await query<RowDataPacket[]>(
    `SELECT email,verify_code FROM ${coreSchema}.patient WHERE email = ? LIMIT 1`,
    {
      values: [patientData.email],
    }
  );

  if (!rows || rows.length === 0) {
    console.error("❌ Email not found in database:", patientData.email);
    throw new ResponseError.BadRequest("The verification code is incorrect!");
  }

  const storedVerifyCode = rows.verify_code;
  console.log(
    `🔍 Stored Code: ${storedVerifyCode}, Provided Code: ${patientData.verify_code}`
  );

  if (storedVerifyCode !== patientData.verify_code) {
    console.error("❌ Verification code mismatch!");
    throw new ResponseError.BadRequest("The verification code is incorrect!");
  }

  // Update the signup_status
  await query(
    `UPDATE ${coreSchema}.patient SET signup_status = 1 WHERE email = ?`,
    { values: [patientData.email] }
  );

  return rows; 
}
