import { getDisease } from "../../bin/db";

export class DiseasesService {
  public static async getAllDiseases() {
    const data = await getDisease();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
