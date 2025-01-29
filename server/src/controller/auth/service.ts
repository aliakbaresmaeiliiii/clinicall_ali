import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import { getUserByPassword } from "../../bin/db";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/common";
import SendMail from "../../helper/send_email";
import { useValidation } from "../../helper/use_validation";
import { ConfirmEmail } from "../../models/auth";
import { ResponseError } from "../../modules/error/response_error";
import { BuildResponse } from "../../modules/response/app_response";
import { confirmEmailSchema } from "../clinic/schema";
import { ClinicService } from "../clinic/service";
import { checkIfEmailExists, confirmEmail } from "./db";
import { loginSchema } from "./schema";

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED =
  process.env.JWT_REFRESH_TOKEN_EXPIRED || "30d"; // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;

export class AuthService {
  public static async signUp(formData: any) {
    const emailExists = await checkIfEmailExists(formData.email);
    console.log("Email Exists Check Result:", emailExists);
    if (emailExists) {
      console.error(`${formData.email}Email already exists, throwing error...`);
      throw new ResponseError.BadRequest(`${formData.email} is already exist.`);
    } else {
      const generateToken = {
        code: getUniqueCodev2(),
      };
      const token_verify = jwt.sign(
        JSON.parse(JSON.stringify(generateToken)),
        JWT_SECRET_ACCESS_TOKEN,
        {
          expiresIn,
        }
      );

      formData.verify_code = getUniqueCodev3();
      formData.token_verify = token_verify;

      const roleServiceMap: { [key: string]: Function } = {
        clinic: ClinicService.insertClinic,
        // doctor: DoctorService.insertDoctor, // Placeholder for future use
        // patient: PatientService.insertPatient, // Placeholder for future use
      };
      const roleHandler = roleServiceMap[formData.role];
      if (!roleHandler) {
        throw new ResponseError.BadRequest("Invalid role specified.");
      }
      const newUserId = await roleHandler(formData);

      if (!newUserId) {
        throw new ResponseError.BadRequest("Cannot add user to the database!");
      }

      SendMail.AccountRegister(formData);
      return {
        message: null,
        newUser: {
          id: newUserId,
          email: formData.email,
        },
      };
    }
  }

  public static async confirmEmail(formData: ConfirmEmail) {
    const userData = useValidation(confirmEmailSchema, formData);
    const confirmEmailResult = await confirmEmail(userData);
    return confirmEmailResult || null;
  }

  public static async signIn(formData: any) {
    try {
      const validateData = useValidation(loginSchema, formData);
      const userData = await getUserByPassword(
        validateData.email,
        validateData.password
      );
      const plainPassword = validateData.password;
      const hashedPassword = userData[0].password;

      // '$2b$10$c3.soKkfuHX3qswlx/.Wg.vfi1saaBAsrRl4hBwkvIq6NVoAmLBeC'
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

      if (!userData || userData.length === 0) {
        throw new ResponseError.NotFound(
          "Account not found or has been deleted."
        );
      }

      if (!isMatch) {
        throw new ResponseError.Unauthorized("Invalid password.");
      }

      // Step 4: Check Email Confirmation
      if (userData[0]?.emailConfirmed === 0) {
        throw new ResponseError.BadRequest("Email is not confirmed.");
      }
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
      // Log the error and rethrow
      console.error("Error in signIn function:", error);
      throw error;
    }
  }
}
