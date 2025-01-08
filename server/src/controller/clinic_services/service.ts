import { getClinicServices } from "./db";

export class clinicService {
  public static async getClinicService() {
    const data = await getClinicServices();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
