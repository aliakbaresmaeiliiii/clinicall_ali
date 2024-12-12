import { DoctorsDTO } from "../../models/doctors";
import {
  addDoctor,
  checkDoctorPhoneNumberExists,
  doctorDetail,
  getDoctors,
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
  
}
