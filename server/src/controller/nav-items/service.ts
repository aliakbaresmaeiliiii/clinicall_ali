import { getNavItems } from "../../bin/db";

export class NavItemService {
  public static async getAllNavItems() {
    const data = await getNavItems();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }
}


