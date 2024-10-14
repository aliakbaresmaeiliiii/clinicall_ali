import { getDisease } from "../../bin/db";

export class DiseasesService {
  public static async getAllDiseases() {
    const data = await getDisease();
    if (data.length) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
