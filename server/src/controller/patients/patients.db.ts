import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { ResponseError } from "../../modules/error/response_error";
import { IPatient } from "./IPatient";

export async function checkExistPatient(email: string): Promise<boolean> {
  try {
    const queryResult = await query<RowDataPacket[]>(
      `SELECT 1 FROM ${coreSchema}.patient WHERE email = ? LIMIT 1`,
      { values: [email] }
    );

    return queryResult.length > 0;
  } catch (error) {
    console.error("Error checking if patient exists:", error);
    throw new Error("An error occurred while checking patient existence.");
  }
}

export async function registerPatient(data: IPatient): Promise<IPatient> {
  const { password, confirmPassword } = data.password;

  if (password !== confirmPassword) {
    throw new ResponseError.BadRequest("Passwords do not match");
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newId = uuidv4();
  try {
    const result = await query<RowDataPacket>(
      `INSERT INTO ${coreSchema}.patient
          (id,first_name,last_name,email,password,token_verify,verify_code,phone,city,state,country,created_at,updated_at)
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
          data.city,
          data.state,
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
