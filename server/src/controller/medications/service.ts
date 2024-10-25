import { getMedicine, updateIsFavorite } from "../../bin/db";

export class MedicineService {
  public static async getMedicine() {
    const data = await getMedicine();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }

  public static async updateIsFavorite(medication_id: string, isFavorite: boolean) {
    const data = await updateIsFavorite(medication_id, isFavorite);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
