import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { AppResponse } from "../../types/response.interface";
import { ConfirmEmail, CreateUser, User } from "../../types/user";
import { createPasswordSchema } from "./schema";
import bcrypt from "bcrypt";

export async function checkUserExist(email: string): Promise<RowDataPacket[]> {
  const user = await query<RowDataPacket[]>(
    `SELECT user_id,email FROM  ${coreSchema}.users
        WHERE email=?`,
    {
      values: [email],
    }
  );
  return user;
}

export async function confirmEmail(data: ConfirmEmail) {
  const result = await query<RowDataPacket[]>(
    `
      SELECT * 
      FROM ${coreSchema}.users
      WHERE email=? AND deletedAt IS NULL
      `,
    {
      values: [data.email],
    }
  );
  if (result.length < 1)
    return {
      isSuccessfull: false,
      status: 1,
      message: "user not found!",
    } as AppResponse;
  const user = result[0] as User;
  if (user.email !== data.email)
    return {
      isSuccessfull: false,
      status: 1,
      message: "email is not correct",
    } as AppResponse;
  if (user.emailConfirmed) {
    if (user.signupStatus === 1) {
      const result = await query<RowDataPacket[]>(
        `
          UPDATE ${coreSchema}.users
          SET signupStatus=?,emailConfirmed=?,updatedAt=?
          WHERE email =?
          `,
        {
          values: [1, 1, new Date(), data.email],
        }
      );
    }
    return {
      isSuccessfull: true,
      message: "email already confirmed",
    } as AppResponse;
  }
  if (user.verify_code !== data.verify_code)
    return { status: false, message: "code is not correct", code: 400 };
  await query<RowDataPacket[]>(
    `
      UPDATE ${coreSchema}.users
      SET emailConfirmed=1, signupStatus=2,updatedAt=?
      WHERE email=?
    `,
    {
      values: [new Date(), data.email],
    }
  );
  return {
    isSuccessfull: true,
    showToUser: true,
    messageCode: "MSG_01",
    messageKind: 1,
    message: "email confirmed successfully",
  } as AppResponse;
}

export async function getOTP(email: any, tokenVerify: any) {
  const updateData = await query<RowDataPacket[]>(
    `UPDATE  ${coreSchema}.users SET verify_code=? WHERE email = ?`,
    {
      values: [tokenVerify, email],
    }
  );

  const result = await query<RowDataPacket[]>(
    `SELECT * FROM ${coreSchema}.users WHERE email = ?`,
    {
      values: [email],
    }
  );
  return result[0] as User;
}

export async function comparePassword(data: any): Promise<any> {
  const result = await query<RowDataPacket[]>(
    `
    SELECT password FROM ${coreSchema}.users
    WHERE email=?
    `,
    {
      values: [data],
    }
  );
  return result;
}

export async function updateProfileUser(data: User): Promise<any> {
  const result = await query<RowDataPacket>(
    `
      UPDATE ${coreSchema}.users
      SET 
      userName = ?,
      gender = ?,
      phoneNumber = ?,
      dateOfBirth = ?,
      address = ?,
      verify_code = ?,
      tokenVerify = ?,
      country = ?,
      city = ?,
      state = ?,
      zipcode = ?
    WHERE email = ?`,

    {
      values: [
        data.userName,
        data.gender,
        data.phoneNumber,
        data.dateOfBirth,
        data.address,
        data.verify_code,
        data.tokenVerify,
        data.country,
        data.city,
        data.state,
        data.zipcode,
        data.email,
      ],
    }
  );
  return result;
}

export async function checkNickName(): Promise<any> {
  const getData = await query<RowDataPacket>(`SELECT * FROM Ali_DB.users`);
  return getData;
}

export async function updateUserVerifyCode(userId: string, newCode: string) {
  const result = await query<RowDataPacket>(
    `
      UPDATE ${coreSchema}.users
      SET verify_code=?,updatedAt=?
      WHERE user_id=?
      `,
    {
      values: [newCode, new Date(), userId],
    }
  );
  const user = await query<RowDataPacket[]>(
    `
        SELECT user_id,email,verify_code
        FROM ${coreSchema}.users
        WHERE user_id=?
        `,
    {
      values: [userId],
    }
  );
  return user[0] as CreateUser;
}

export async function changePassword(data: any) {
  const { newPassword } = data;
  const { confirmPassword } = data;
  const fdPassword = { newPassword, confirmPassword };
  const validPassword = createPasswordSchema.validateSyncAt(
    "confirmPassword",
    fdPassword
  );
  const saltRounds = 10;
  const hash = bcrypt.hashSync(validPassword, saltRounds);

  const result = await query<RowDataPacket[]>(
    `
      UPDATE ${coreSchema}.users
      SET password=?,updatedAt=?
      WHERE email=?
      `,
    {
      values: [hash, new Date(), data.email],
    }
  );
  return result;
}

// export async function getUserInfo(email: string) {
//   const data = await query<RowDataPacket[]>(
//     `SELECT * FROM ${coreSchema}.users WHERE email=?`,
//     {
//       values: [email],
//     }
//   );
//   if (data) return data;
// }

export async function getUserInfo(email: string) {
  const data = await query<RowDataPacket[]>(
    `
     SELECT 
       u.*, 
       c.comment_text, 
       c.created_at AS comment_created_at
     FROM ${coreSchema}.users u
     LEFT JOIN 
     ${coreSchema}.comments c
     ON 
     u.user_id = c.user_id
     WHERE 
     u.email =?
    `,
    {
      values: [email],
    }
  );

  if (!data || data.length === 0) {
    return null; // Return null if no data is found
  }

  const userMap = new Map<number, any>();

  data.forEach((row) => {
    if (!userMap.has(row.user_id)) {
      userMap.set(row.user_id, {
        ...data,
        comments: [],
      });
    }

    if (row.comment_text) {
      userMap.get(row.user_id).comments.push({
        text: row.comment_text,
        createdAt: row.comment_created_at,
      });
    }
  });
  return Array.from(userMap.values());
}
