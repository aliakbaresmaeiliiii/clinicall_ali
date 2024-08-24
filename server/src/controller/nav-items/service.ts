import { getNavItems } from "../../bin/db";

class NavItemService {
  public static async getAllNavItems() {
    const data = await getNavItems();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }
}


export {  NavItemService  };
