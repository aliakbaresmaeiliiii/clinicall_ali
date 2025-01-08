import { getAllInsurances } from "./db";

export class InsuranceService {
  public static async getAllInsurances() {
    const data = await getAllInsurances();
    if (data) {
      return { message: "ok", data };
    } else {
      return { message: "No data found", data: null };
    }
  }

}
