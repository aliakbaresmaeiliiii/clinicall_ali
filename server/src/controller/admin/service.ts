import { getAdmins } from "../../bin/db";

class UserAdmin {
  public static async getUserAdmin() {
    const admin = await getAdmins();
    if (admin) {
      return { message: "ok", admin };
    } else {
      return null;
    }
  }
}

export { UserAdmin };
