import { IClinic } from "../clinic/Iclinic";
import { getClinicServices } from "./db";

export class clinicService {
  public static async getClinicService(formData: IClinic) {
    const data = await (formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
