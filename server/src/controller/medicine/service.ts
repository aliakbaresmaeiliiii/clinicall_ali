import { getMedicine } from "../../bin/db";

export class MedicineService {
  public static async getMedicine() {
    const result = await getMedicine();
    if (result) {
      return { message: `ok`, result };
    }
    return null;
  }
}
