import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { IClinic } from "./Iclinic";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { registerClinicSchema } from "./schema";
import { useValidation } from "../../helper/use_validation";
import { ResponseError } from "../../modules/error/response_error";

export async function checkExistClinic(email: string): Promise<boolean> {
  try {
    const queryResult = await query<RowDataPacket[]>(
      `SELECT 1 FROM ${coreSchema}.clinic WHERE email = ? LIMIT 1`,
      [email]
    );

    return queryResult.length > 0;
  } catch (error) {
    console.error("Error checking if clinic exists:", error);
    throw new Error("An error occurred while checking clinic existence.");
  }
}

export async function insertClinic(data: IClinic) {
  const { password } = data.password;
  const { confirmPassword } = data.password;

  const fdPassword = { password ,confirmPassword};
  const validPassword = registerClinicSchema.validateSyncAt(
    "confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hashedPassword =await bcrypt.hash(validPassword, saltRounds);
  if (validPassword.error) {
    // Handle validation error
    throw new Error("Password is invalid");
  }
  const newId = uuidv4();

  try {
    const result = await query<RowDataPacket[]>(
      `INSERT INTO ${coreSchema}.clinic
        (id,name,owner_name,email,password,token_verify,verify_code,phone,city,state,zip_code,country,created_at,updated_at)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      {
        values: [
          newId,
          data.name,
          data.owner_name,
          data.email,
          hashedPassword,
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
    return result;
  } catch (error: any) {
    console.error("Database Error:", error.message);
    throw new ResponseError.InternalServer("Failed to insert clinic.");
  }
}


