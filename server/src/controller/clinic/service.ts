import { insertClinic } from "./db";

export class ClinicService {
  public static async registerClinic(formData: any) {
    const data = await insertClinic(formData);
    if (data) {
      return { mesage: "ok", data };
    } else {
      return null;
    }
  }
}
