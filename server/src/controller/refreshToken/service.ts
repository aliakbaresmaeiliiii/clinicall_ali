// import { verifyRefreshToken } from "../../helper/token";
// import ResponseError from "../../modules/error/response_error";

import useValidation from "../../helper/use_validation";
import { RefreshTokenAttributes } from "../../models/refreshToken";
import schema from "./schema";





class RefreshTokenService {

  /**
   * @param formData
   */

  public static async create(formData: RefreshTokenAttributes) {
    const value = useValidation(schema.create, formData)
    // const data = await RefreshToken.create(value)
    // return data

  }


// /**
//  * @param token
//  */

// public static async getToken(token:string){
//     const data = await RefreshToken
// }


//   /**
//    *@param email
//    *@param refreshToken
//    */

//   public static async getAccessToken(email: string, refreshToken: string) {
//     if (!email || !refreshToken) {
//       throw new ResponseError.BadRequest("invalid token");
//     }
//     const getToken = await this.getAccessToken(refreshToken)
//     const verifyToken = verifyRefreshToken(getToken.token)
//   }
}
