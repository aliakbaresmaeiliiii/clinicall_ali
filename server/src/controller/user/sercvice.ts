import {
  changePassword,
  checkNickName,
  checkUserExist,
  comparePassword,
  confirmEmail,
  getOTP,
  getUserInfo,
  updateProfileUser,
  updateUserVerifyCode,
} from "../../bin/db";
import {useValidation} from "../../helper/use_validation";
import {BuildResponse} from "../../modules/response/app_response";
import { ConfirmEmail, User } from "../../types/user";
import {SendEmail} from "../../helper/send_email";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/common";
import jwt from "jsonwebtoken";
import ms from "ms";
import {ResponseError} from "../../modules/error/response_error";
import bcrypt from "bcrypt";
import { checkEmailSchema, confirmEmailSchema } from "./schema";

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;
const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;

export class UserService {
  public static async getUserInfo(email: string) {
    return await getUserInfo(email);
  }
  /**
   * @param email
   */
  public static async validateUserEmail(email: string) {
    const data = await checkUserExist(email);

    if (data.length) {
      return data[0] as User;
    }
    return null;
  }

  /**
   * @param formData
   */
  public static async confrimEmail(formData: ConfirmEmail) {
    const userData = useValidation(confirmEmailSchema, formData);
    const confirmEmailResult = await confirmEmail(userData);
    return BuildResponse.appResponse(confirmEmailResult);
  }
  /**
   * @param formData
   */
  public static async getVerifyCode(userData: any, tokenVerify: any) {
    // const userData = useValidation(schemaUser.confirmEmail,userData)
    const result = await getOTP(userData, tokenVerify);
    SendEmail.AccountRegister(result);

    if (result) {
      return result;
    }
    return null;
  }
  /**
   * @param email
   */
  public static async changePassword(formData: User) {
    const getNewPassword = await comparePassword(formData.email);
    const pass = getNewPassword[0].password;
    const getComparePassword = await bcrypt.compare(formData.oldPassword, pass);

    if (getComparePassword) {
      const getNewPassword = await changePassword(formData);
      return getNewPassword
    }
  }
  /**
   * @param userData
   */

  public static async updateProfileuser(userData: User) {
    const generateToken = {
      code: getUniqueCodev2(),
    };

    const tokenVerify = jwt.sign(
      JSON.parse(JSON.stringify(generateToken)),
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn,
      }
    );

    userData.verify_code = getUniqueCodev3();
    userData.tokenVerify = tokenVerify;
    const result = await updateProfileUser(userData);
    if (!result) {
      throw new ResponseError.BadRequest("Can Not Update profile...");
    } else {
      return result;
    }
  }

  /**
   * @param email
   */
  public static async checkNickName(nickName: string) {
    const getData = await checkNickName();
    if (getData[0].nickName === nickName) {
      throw new ResponseError.BadRequest("The nickName is alreay exist!");
    } else {
      return;
    }
  }

  public static async sendFrogetPasswordToken(email: string) {
    useValidation(checkEmailSchema, { email: email });
    const currentUser = await UserService.validateUserEmail(email);
    if (!currentUser) return { status: 1, message: "email is not valid !" };

    if (currentUser.emailConfirmed === 0)
      return {
        status: 2,
        message: "this email address is not confirmed yet !",
      };
    if (currentUser.signupStatus === 0)
      return { status: 3, message: "signup process is not complete yet !" };
    // TODO for fix isActive to boolean
    if (currentUser.isActive === 0)
      return { status: 4, message: "this account is not active !" };
    const newCode = getUniqueCodev3();
    await updateUserVerifyCode(currentUser.user_id, newCode);
    // send forgot pass token code
    // SendMail.sendResetPasswordEmail(currentUser, newCode);
    return { status: 5, message: "code has been send successfully !" };
  }
}

