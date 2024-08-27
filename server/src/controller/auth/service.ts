import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import { createUser, getUserByPassword } from "../../bin/db";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/common";
import SendMail from "../../helper/send_email";
import useValidation from "../../helper/use_validation";
import ResponseError from "../../modules/error/response_error";
import { CreateUser, User } from "../../types/user";
import schemaAuth from "./schema";
import { AppResponse } from "../../types/response.interface";
import UserService from "../user/sercvice";

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED =
  process.env.JWT_REFRESH_TOKEN_EXPIRED || "30d"; // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;

class AuthService {
  public static async signUp(formData: CreateUser) {
    const currentUser = await UserService.validateUserEmail(formData.email);
    if (currentUser) {
      return { message: "the user already exist !", code: 400, currentUser };
    }

    // const getNickName = await UserService.checkNickName(formData.email);
    // if (getNickName === formData.email) {
    //   return {
    //     message: "the nickname is already exist!",
    //     code: 400,
    //     getNickName,
    //   };
    // }
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

    formData.verify_code = getUniqueCodev3();
    formData.tokenVerify = tokenVerify;
    useValidation(schemaAuth.register, formData);
    const newUserId = await createUser(formData);
    if (!newUserId)
      throw new ResponseError.BadRequest("Cannot add user in the database !");
    SendMail.AccountRegister(formData);
    return {
      message: null,
      newUser: {
        user_id: newUserId,
        email: formData.email,
      },
    };
  }

  public static async signIn(formData: User) {
    const checkValidation = useValidation(schemaAuth.login, formData);

    const userData = await getUserByPassword(
      checkValidation.email,
      checkValidation.password
    );

    const match = await new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(
        formData.password,
        userData[0]?.password,
        (err, isMatch) => {
          if (err) reject(err);
          resolve(isMatch);
        }
      );
    });
    if (!match) {
      throw new ResponseError.NotFound("account not found or has been deleted");
    }

    if (!userData) {
      throw new ResponseError.NotFound("account not found or has been deleted");
    } else if (userData.emailConfirmed === 0) {
      throw new ResponseError.BadRequest("email is not confirmed");
    }

    const comparePassword = true;

    if (comparePassword) {
      const user = {
        user_id: userData[0].user_id,
        email: userData[0].email,
        imgUser: userData[0].imgUser,
        mobile: userData[0].mobile,
        address: userData[0].address,
        tokenVerify: userData[0].tokenVerify,
        roles: [] as string[],
        permissions: [] as string[],
      };
      userData.forEach((element: any) => {
        if (element.role_name && !user.roles.includes(element.role_name)) {
          user.roles.push(element.role_name);
        }
        if (
          element.permission_name &&
          !user.permissions.includes(element.permission_name)
        ) {
          user.permissions.push(element.permission_name);
        }
      });
      return {
        isSuccessfull: true,
        showToUser: true,
        messageCode: "200",
        messageKind: 1,
        message: "login is successfully",
        data: user,
      } as AppResponse;
    } else {
      throw new ResponseError.Unauthorized("Invalid password");
    }
  }
}

export default AuthService;
