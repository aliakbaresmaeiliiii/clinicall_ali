import { getDisease, getDiseaseSubcategories } from "../../bin/db";

export class DiseasesService {
  public static async getAllDiseases() {
    const data = await getDisease();
    if (data) {
      return { message: "ok", data };
    } else {
      return { message: "No data found", data: null };
    }
  }
  public static async getDiseaseSubcategories(disease_id: string) {
    const data = await getDiseaseSubcategories(disease_id);
    if (data) {
      return { message: "ok", data };
    } else {
      return { message: "No data found", data: null };
    }
  }
}
