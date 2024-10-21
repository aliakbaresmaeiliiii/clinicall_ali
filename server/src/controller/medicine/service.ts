import { getMedicine } from "../../bin/db";

export class MedicineService {
  public static async getMedicine() {
    const data = await getMedicine();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }
}
