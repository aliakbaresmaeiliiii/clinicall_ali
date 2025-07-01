import jwt from "jsonwebtoken";
import ms from "ms";
import {
  checkPhoneNumberExists,
  deletePatient,
  getDoctorInfo,
  getPatientDetail,
  getPatients,
  updatePatient,
} from "../../bin/db";
import { EmailProvider } from "../../config/email";
import { getUniqueCodev3 } from "../../helper/common";
import SendMail from "../../helper/send_email";
import { PatientDTO } from "../../models/patients";
import { ResponseError } from "../../modules/error/response_error";
import { addFavorite, checkExistPatient, registerPatient } from "./patients.db";

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // Default 1 day
const JWT_SECRET_ACCESS_TOKEN =
  process.env.JWT_SECRET_ACCESS_TOKEN || "your-secret-key";

// Check if expiration needs conversion
const expiresIn =
  typeof JWT_ACCESS_TOKEN_EXPIRED === "string" &&
  /^[0-9]+[smhdwy]$/i.test(JWT_ACCESS_TOKEN_EXPIRED)
    ? Math.floor(ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000)
    : JWT_ACCESS_TOKEN_EXPIRED;

export class PatientService {
  public static async getPatients(queryParams: any) {
    const { patient_id, queryString } = queryParams;
    const data = await getPatients(patient_id, queryString);

    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }

  public static async getPatientDetial(query: number) {
    const patient_id = query;
    const data = await getPatientDetail(patient_id);
    const doctor_id = data[0].doctor_id
    // const doctorDetail = data.find((item:any) => item.doctor_id);

    if(doctor_id){
      const doctorInfo =await getDoctorInfo(doctor_id);

      const doctorDetail = {

      }
      return { message: `ok`, data ,...doctorInfo};
    }
    return null;
  }

  public static async checkExistMobile(mobile: string): Promise<boolean> {
    const data = await checkPhoneNumberExists(mobile);
    if (data) {
      return true;
    } else {
      return false;
    }
  }

  // ****
  public static async registerPatient(formData: any) {
    const emailExists = await checkExistPatient(formData.email);

    if (emailExists) {
      console.error(
        `${formData.email} Email already exists, throwing error...`
      );
      throw new ResponseError.BadRequest(`${formData.email} is already exist.`);
    }

    const verificationCode = getUniqueCodev3();
    formData.verify_code = verificationCode;

    const tokenVerify = jwt.sign(
      { email: formData.email },
      JWT_SECRET_ACCESS_TOKEN,
      { expiresIn }
    );
    formData.token_verify = tokenVerify;
    // Send verification email

    const clinicData = await registerPatient(formData);

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
  // ****

  public static async updatePatient(formData: PatientDTO) {
    const data = await updatePatient(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async deletePatient(id: number) {
    const data = await deletePatient(id);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async addFavorite(formData: {
    patient_id: number;
    doctor_id: number;
  }) {
    const data = await addFavorite(formData.patient_id, formData.doctor_id);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
