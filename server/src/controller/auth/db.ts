import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { ConfirmEmail } from "../../models/auth";
import { ResponseError } from "../../modules/error/response_error";

export async function checkIfEmailExists(email: string) {
  // Query Clinic Table
  const clinicResult = await query<RowDataPacket[]>(
    `SELECT 1 FROM ${coreSchema}.clinic WHERE email = ? LIMIT 1`,
    {
      values: [email], // ✅ Corrected query format
    }
  );

  // Query Doctors Table
  const doctorResult = await query<RowDataPacket[]>(
    `SELECT 1 FROM ${coreSchema}.doctors WHERE email = ? LIMIT 1`,
    {
      values: [email], // ✅ Corrected query format
    }
  );
  const patientResult = await query<RowDataPacket[]>(
    `SELECT 1 FROM ${coreSchema}.patient WHERE email = ? LIMIT 1`,
    {
      values: [email], // ✅ Corrected query format
    }
  );

  // ✅ Ensure proper handling of results
  const clinicExists = clinicResult.length > 0;
  const doctorExists = doctorResult.length > 0;
  const patientExists = patientResult.length > 0;

  if (clinicExists) {
    return clinicExists;
  } else if (doctorExists) {
    return doctorExists;
  } else if (patientExists) {
    return patientExists;
  }
}

export async function confirmDoctorEmail(data: ConfirmEmail) {
  try {
    const emailExists = await checkIfEmailExists(data.email);
    if (!emailExists) {
      return null; // Email not found
    }

    const [doctor] = await query<RowDataPacket[]>(
      `SELECT id FROM ${coreSchema}.doctor WHERE email =? AND verify_code =?`,
      { values: [data.email, data.verify_code] }
    );
    if (!doctor) {
      return null;
    }

    const resultDoctor = await query<RowDataPacket[]>(
      `UPDATE ${coreSchema}.doctor SET signup_status=?, updated_at=? WHERE email =?`,
      { values: [1, new Date(), data.email] }
    );

    return resultDoctor;
  } catch (error) {
    console.error("Error confirming doctor email:", error);
    throw new ResponseError.BadRequest("Failed to confirm doctor email");
  }
}

export async function confirmClinicEmail(data: ConfirmEmail) {
  try {
    const emailExists = await checkIfEmailExists(data.email);
    if (!emailExists) {
      return null; // Email not found
    }

    // Doctor
    // const doctors = await query<RowDataPacket[]>(
    //   `SELECT id FROM ${coreSchema}.doctors WHERE email =? AND verify_code =?`,
    //   { values: [data.email, data.verify_code] }
    // );
    // if (!doctors) {
    //   return null;
    // }

    const resultDoctors = await query<RowDataPacket[]>(
      `UPDATE ${coreSchema}.doctors SET signup_status=?, updated_at=? WHERE email =?`,
      { values: [1, new Date(), data.email] }
    );

    // Clinic
    const clinic = await query<RowDataPacket[]>(
      `SELECT id FROM ${coreSchema}.clinic WHERE email =? AND verify_code =?`,
      { values: [data.email, data.verify_code] }
    );
    if (!clinic) {
      return null;
    }

    const result = await query<RowDataPacket[]>(
      `UPDATE ${coreSchema}.clinic SET signup_status=?, updated_at=? WHERE email =?`,
      { values: [1, new Date(), data.email] }
    );

    return result || resultDoctors;
  } catch (error) {
    console.error("Error confirming clinic email:", error);
    throw new Error("Failed to confirm clinic email");
  }
}

export async function getClinicByPassword(
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
    FROM ${coreSchema}.clinic 
    WHERE email = ?`,
    {
      values: [email],
    }
  );
  return user;
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
    // ` SELECT u.*, r.*,p.*
    // LEFT JOIN ${coreSchema}.user_roles ur ON u.id = ur.id
    // LEFT JOIN ${coreSchema}.roles r ON ur.role_id = r.id
    // LEFT JOIN ${coreSchema}.role_permissions rp ON r.id = rp.role_id
    // LEFT JOIN ${coreSchema}.permissions p ON rp.permission_id  = p.id
    ` SELECT *
    FROM ${coreSchema}.doctors 
    WHERE email = ?`,
    {
      values: [email],
    }
  );
  return user;
}
