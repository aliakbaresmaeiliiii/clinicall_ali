import { coreSchema, query, RowDataPacket } from "../../bin/mysql";
import { ConfirmEmail } from "../../models/auth";

export async function checkIfEmailExists(email: string): Promise<boolean> {
  const clinicExist = await query<RowDataPacket[]>(
    `SELECT email FROM ${coreSchema}.clinic WHERE email = ?`,
    {
      values: [email],
    }
  );
  // const doctorExist = await query<RowDataPacket[]>(
  //   `SELECT 1 FROM ${coreSchema}.doctor WHERE email = ? LIMIT 1`,
  //   [email]
  // );
  // const patientExist = await query<RowDataPacket[]>(
  //   `SELECT 1 FROM ${coreSchema}.patient WHERE email = ? LIMIT 1`,
  //   [email]
  // );

  return clinicExist.length > 0;
}

export async function confirmEmail(data: ConfirmEmail) {
  try {
    const emailExists = await checkIfEmailExists(data.email);
    if (!emailExists) {
      return null; // Email not found
    }

    const [user] = await query<RowDataPacket[]>(
      `SELECT id FROM ${coreSchema}.clinic WHERE email =? AND verify_code =?`,
      {
        values: [data.email, data.verify_code],
      }
    );
    if (!user) {
      return null;
    }

    const result = await query<RowDataPacket[]>(
      `
          UPDATE ${coreSchema}.clinic
          SET signup_status=?,updated_at=?
          WHERE email =?
        `,
      {
        values: [1, new Date(), data.email],
      }
    );

    return result;
  } catch (error) {
    // Log the error and rethrow it
    console.error("Error confirming email:", error);
    throw new Error("Failed to confirm email");
  }
}

// if (result.length < 1)
//   return {
//     isSuccessfull: false,
//     status: 1,
//     message: "user not found!",
//   } as AppResponse;
// const user = result[0] as User;
// if (user.email !== data.email)
//   return {
//     isSuccessfull: false,
//     status: 1,
//     message: "email is not correct",
//   } as AppResponse;
// if (user.emailConfirmed) {
//   if (user.signupStatus === 1) {
//     const result = await query<RowDataPacket[]>(
//       `
//         UPDATE ${coreSchema}.users
//         SET signupStatus=?,emailConfirmed=?,updatedAt=?
//         WHERE email =?
//         `,
//       {
//         values: [1, 1, new Date(), data.email],
//       }
//     );
//   }
//   return {
//     isSuccessfull: true,
//     message: "email already confirmed",
//   } as AppResponse;
// }
// if (user.verify_code !== data.verify_code)
//   return { status: false, message: "code is not correct", code: 400 };
// await query<RowDataPacket[]>(
//   `
//     UPDATE ${coreSchema}.users
//     SET emailConfirmed=1, signupStatus=2,updatedAt=?
//     WHERE email=?
//   `,
//   {
//     values: [new Date(), data.email],
//   }
// );
// return {
//   isSuccessfull: true,
//   showToUser: true,
//   messageCode: "MSG_01",
//   messageKind: 1,
//   message: "email confirmed successfully",
// } as AppResponse;
