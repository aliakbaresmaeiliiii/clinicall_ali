import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import { createUser, getUserByPassword } from "../../bin/db";
import { getUniqueCodev2, getUniqueCodev3 } from "../../helper/common";
import SendMail from "../../helper/send_email";
import { useValidation } from "../../helper/use_validation";
import { ResponseError } from "../../modules/error/response_error";
import { AppResponse } from "../../types/response.interface";
import { CreateUser, User } from "../../types/user";
import { UserService } from "../user/sercvice";
import { loginSchema, registerSchema } from "./schema";

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env;

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || "1d"; // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED =
  process.env.JWT_REFRESH_TOKEN_EXPIRED || "30d"; // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000;

export class AuthService {
  public static async signUp(formData: CreateUser) {
    const currentUser = await UserService.validateUserEmail(formData.email);
    if (currentUser) {
      return { message: "the user already exist !", code: 400, currentUser };
    }

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
    useValidation(registerSchema, formData);
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
    const checkValidation = useValidation(loginSchema, formData);

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
      const user: User = {
        user_id: userData[0].user_id,
        firstName: userData[0].firstName,
        lastName: userData[0].lastName,
        userName: userData[0].userName,
        gender: userData[0].gender,
        national_code: userData[0].national_code,
        city: userData[0].city,
        email: userData[0].email,
        imgUser: userData[0].imgUser,
        phoneNumber: userData[0].phoneNumber,
        address: userData[0].address,
        dateOfBirth: userData[0].dateOfBirth,
        tokenVerify: userData[0].tokenVerify,
        roles: [],
        permissions: [],
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
