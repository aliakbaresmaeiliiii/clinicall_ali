import { getAllCities, GetNeighborhoods } from "./db";

export class citiesService {
  public static async getAllCities() {
    const data = await getAllCities();
    if (data) {
      return { message: "ok", data };
    } else {
      return { message: "No data found", data: null };
    }
  }
  public static async filtered_neighbor(city_id: number) {
    const data = await GetNeighborhoods(city_id);
    if (data) {
      return { message: "ok", data };
    } else {
      return { message: "No data found", data: null };
    }
  }
}
