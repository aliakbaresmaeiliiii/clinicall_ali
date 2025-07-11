import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import { useValidation } from "../../helper/use_validation";
import { ILogin } from "../../models/auth";
import { ResponseError } from "../../modules/error/response_error";
import {
  getClinicByPassword,
  getClinicVerificationCode,
  getDoctorByPassword,
  getPatientByPassword,
  getPatientVerificationCode,
} from "./db";
import { loginSchema } from "./schema";
import { IPatient } from "../patients/IPatient";

const {
  JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
}: any = process.env;

export class AuthService {
  // public static generateToken(user: any) {
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     is_verified: user.is_verified, // Include verification status
  //   };

  //   return jwt.sign(payload, JWT_REFRESH_TOKEN_EXPIRED);
  // }
  public static async clinicSignIn(formData: ILogin) {
    try {
      const validateData = useValidation(loginSchema, formData);
      const userData = await getClinicByPassword(
        validateData.email,
        validateData.password
      );
      if (!userData || userData.length === 0) {
        throw new ResponseError.Unauthorized("Invalid email or password.");
      }
      const plainPassword = validateData.password;
      const hashedPassword = userData[0].password;
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

      if (!isMatch) {
        throw new ResponseError.Unauthorized(
          "email or passwrod is not correct!"
        );
      }
      if (userData[0]?.signup_status === 0) {
        throw new ResponseError.BadRequest("Email is not confirmed.");
      }

      if (userData[0]?.signup_status === 0) {
        throw new ResponseError.BadRequest("Email is not confirmed.");
      }
      const token = jwt.sign(
        { id: userData[0].id, email: userData[0].email }, // Payload (user info)
        JWT_SECRET_ACCESS_TOKEN, // Secret key
<<<<<<< HEAD
        { expiresIn: JWT_ACCESS_TOKEN_EXPIRED } // Expiry time
=======
        { expiresIn: 60 } // Expiry time
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      );
      const clinicData = {
        id: userData[0].id,
        name: userData[0].name,
        owner_name: userData[0].owner_name,
        email: userData[0].email,
        city: userData[0].city,
        phone: userData[0].phone,
        state: userData[0].state,
        zip_code: userData[0].zip_code,
        country: userData[0].country,
        token,
        // roles: [
        //   ...new Set(userData.map((el: any) => el.role_name).filter(Boolean)),
        // ],
        // permissions: [
        //   ...new Set(
        //     userData.map((el: any) => el.permission_name).filter(Boolean)
        //   ),
        // ],
      };
      return clinicData;
    } catch (error) {
      if (error instanceof ResponseError.BaseResponse) {
        return error; // Re-throw known errors
      }
      throw new ResponseError.InternalServer("An unexpected error occurred.");
    }
  }
  public static async doctorSignIn(formData: ILogin) {
    try {
      const validateData = useValidation(loginSchema, formData);
      const userData = await getDoctorByPassword(
        validateData.email,
        validateData.password
      );

      if (!userData || userData.length === 0) {
        throw new ResponseError.Unauthorized("Invalid email or password.");
      }
      // if (!userData || userData.length === 0) {
      //   throw new ResponseError.NotFound(
      //     "Account not found or has been deleted."
      //   );
      // }
      const plainPassword = validateData.password;
      const hashedPassword = userData[0].password;
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

      if (!isMatch) {
        throw new ResponseError.Unauthorized(
          "email or passwrod is not correct!"
        );
      }
      if (userData[0]?.emailConfirmed === 0) {
        throw new ResponseError.BadRequest("Email is not confirmed.");
      }
      const clinicData = {
        id: userData[0].id,
        first_name: userData[0].name,
        last_name: userData[0].owner_name,
        email: userData[0].owner_name,

        // roles: [
        //   ...new Set(userData.map((el: any) => el.role_name).filter(Boolean)),
        // ],
        // permissions: [
        //   ...new Set(
        //     userData.map((el: any) => el.permission_name).filter(Boolean)
        //   ),
        // ],
      };
      return clinicData;
    } catch (error) {
      if (error instanceof ResponseError.BaseResponse) {
        return error; // Re-throw known errors
      }
      throw new ResponseError.InternalServer("An unexpected error occurred.");
    }
  }

  public static async patientSignIn(formData: ILogin) {
    try {
      const validateData = useValidation(loginSchema, formData);
      const userData = await getPatientByPassword(
        validateData.email,
        validateData.password
      );
      if (!userData || userData.length === 0) {
        throw new ResponseError.Unauthorized("Invalid email or password.");
      }
      const plainPassword = validateData.password;
      const hashedPassword = userData[0].password;
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

      if (!isMatch) {
        throw new ResponseError.Unauthorized(
          "email or passwrod is not correct!"
        );
      }
      if (userData[0]?.signup_status === 0) {
        throw new ResponseError.BadRequest("Email is not confirmed.");
      }

      if (userData[0]?.signup_status === 0) {
        throw new ResponseError.BadRequest("Email is not confirmed.");
      }
      const token = jwt.sign(
        { id: userData[0].id, email: userData[0].email }, // Payload (user info)
        JWT_SECRET_ACCESS_TOKEN, // Secret key
        { expiresIn: 60 } // Expiry time
      );
      const patientData: any = {
        id: userData[0].id,
        first_name: userData[0].first_name,
        last_name: userData[0].last_name,
        email: userData[0].email,
        token,
        // roles: [
        //   ...new Set(userData.map((el: any) => el.role_name).filter(Boolean)),
        // ],
        // permissions: [
        //   ...new Set(
        //     userData.map((el: any) => el.permission_name).filter(Boolean)
        //   ),
        // ],
      };
      return patientData;
    } catch (error) {
      if (error instanceof ResponseError.BaseResponse) {
        return error; // Re-throw known errors
      }
      throw new ResponseError.InternalServer("An unexpected error occurred.");
    }
  }

  // *****confirmClinicEmail*****
  public static async confirmClinicEmail(clinicData: {
    email: string;
    verify_code: string;
  }) {
    const data = await getClinicVerificationCode(clinicData);
    if (data) {
      return data;
    } else {
      return null;
    }
  }
  // *****confirmPatientEmail*****
  public static async confirmPatientEmail(clinicData: {
    email: string;
    verify_code: string;
  }) {
    const data = await getPatientVerificationCode(clinicData);
    if (data) {
      return data;
    } else {
      return null;
    }
  }
}
