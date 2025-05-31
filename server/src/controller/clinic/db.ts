import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { ResponseError } from "../../modules/error/response_error";
import { IClinic } from "./Iclinic";

export async function checkExistClinic(email: string): Promise<boolean> {
  try {
    const queryResult = await query<RowDataPacket[]>(
      `SELECT 1 FROM ${coreSchema}.clinics WHERE email = ? LIMIT 1`,
      { values: [email] }
    );

    return queryResult.length > 0;
  } catch (error) {
    console.error("Error checking if clinic exists:", error);
    throw new Error("An error occurred while checking clinic existence.");
  }
}

export async function registerClinic(data: IClinic): Promise<IClinic> {
  const {password , confirmPassword}= data.password

  if (password !== confirmPassword) {
    throw new ResponseError.BadRequest("Passwords do not match");
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newId = uuidv4();
  try {
    const result = await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.clinics
        (id,name,owner_name,email,password,token_verify,verify_code,phone,city,state,zip_code,country,created_at,updated_at)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      {
        values: [
          newId,
          data.name,
          data.owner_name,
          data.email,
          hashedPassword ,
          data.token_verify,
          data.verify_code,
          data.phone,
          data.city,
          data.state,
          data.zip_code,
          data.country,
          new Date(),
          new Date(),
        ],
      }
    );
    return { ...data, id: newId };
  } catch (error: any) {
    console.error("Database Error:", error.message);
    throw new ResponseError.InternalServer("Failed to insert clinic.");
  }
}

export async function findClinicByEmail(email: string): Promise<boolean> {
  try {
    const result = await query<RowDataPacket>(
      `SELECT email FROM ${coreSchema}.clinics WHERE email ? LIMIT 1`,
      {
        values: [email],
      }
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error querying clinic by email:", error);
    throw new ResponseError.InternalServer("Failed to insert clinic.");
  }
}
