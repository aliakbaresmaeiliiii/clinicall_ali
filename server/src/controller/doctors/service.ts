import { DoctorsDTO, likeDTO } from "../../models/doctors";
import {
  addDoctor,
  checkDoctorPhoneNumberExists,
  doctorDetail,
  getDoctors,
  getDoctorSpecializations,
  getMostPopularDoctors,
  like,
  logDoctorClick,
  updateDoctor,
} from "./db";

export class DoctorsService {
  public static async getDoctors() {
    const data = await getDoctors();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async getMostPopularDoctors() {
    const data = await getMostPopularDoctors();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async checkDoctorPhoneNumberExists(
    mobile: string
  ): Promise<boolean> {
    const data = await checkDoctorPhoneNumberExists(mobile);
    if (data) {
      return true;
    } else {
      return false;
    }
  }

  public static async registerDoctor(formData: DoctorsDTO) {
    const data = await addDoctor(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async doctorDetial(doctortId: number) {
    const data = await doctorDetail(doctortId);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async updateDoctor(formData: DoctorsDTO) {
    const data = await updateDoctor(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async getDoctorSpecializations(doctorId: number) {
    const data = await getDoctorSpecializations(doctorId);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async logDoctorClick(doctor_id: number) {
    const data = await logDoctorClick(doctor_id);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async toggleLike(likeInfo: likeDTO) {
    const data = await like(likeInfo);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
