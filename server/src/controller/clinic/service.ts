import { EmailProvider } from "../../config/email";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/common";
import { ResponseError } from "../../modules/error/response_error";
import { checkExistClinic, registerClinic } from "./db";
import sendAccountRegister from "../../helper/send_email";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import SendMail from "../../helper/send_email";

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED =
  process.env.JWT_REFRESH_TOKEN_EXPIRED || "30d"; // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;
export class ClinicService {
  public static async registerClinic(formData: any) {
    const emailExists = await checkExistClinic(formData.email);

    if (emailExists) {
      console.error(
        `${formData.email} Email already exists, throwing error...`
      );
      throw new ResponseError.BadRequest(`${formData.email} is already exist.`);
    }
    
    
    // Generate a unique verification code
    const verificationCode = getUniqueCodev3();
    formData.verify_code = verificationCode;
    
    // Generate email verification token (without storing the code inside the JWT)
    const tokenVerify = jwt.sign(
      { email: formData.email },
      JWT_SECRET_ACCESS_TOKEN,
      { expiresIn }
    );
    formData.token_verify = tokenVerify;
    // Send verification email
    
    const clinicData = await registerClinic(formData);
    if (!clinicData) {
      throw new ResponseError.BadRequest("Failed to register clinic.");
    }
    const emailService = new SendMail(new EmailProvider());
    await emailService.sendAccountRegister(formData.email, verificationCode);

    return {
      message: "Clinic registered successfully. Please verify your email.",
      newUser: {
        id: clinicData.id,
        email: formData.email,
      },
    };
  }
}
