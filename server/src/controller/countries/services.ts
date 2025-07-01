import { getAllCountries } from "./db";

export class CountriesService {
  public static async getAllCountries() {
    const countries = await getAllCountries();
    if (countries) {
      return { message: "ok", countries };
    } else {
      return { message: "No data found", data: null };
    }
  }
}
