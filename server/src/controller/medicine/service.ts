import { getMedicine, updateIsFavorite } from "../../bin/db";

export class MedicineService {
  public static async getMedicine() {
    const data = await getMedicine();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }

  public static async updateIsFavorite(id: string, isFavorite: boolean) {
    const data = await updateIsFavorite(id, isFavorite);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
