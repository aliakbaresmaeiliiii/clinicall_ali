import { Request, Response } from "express";
import asyncHandler from "../../helper/async-handler";
import { getUniqueCodev3 } from "../../helper/common";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";
import UserService from "./sercvice";

// ***** checkNickName
routes.get(
  "/user/checkNickName/:nickname",
  asyncHandler(async function checkNickName(req: Request, res: Response) {
    const formData = req.params.nickname;
    const result = await UserService.checkNickName(formData);
    res.json(result);
  })
);
// ***** getUserInfo
routes.get(
  "/getUserInfo/:email",
  async function getAllUserData(req: Request, res: Response) {
    const data = req.params.email;
    const userData = await UserService.getUserInfo(data);
    const buildResponse = await BuildResponse.get(userData);
    return res.json(buildResponse);
  }
);
// ***** confirm
routes.post(
  "/user/confirm",
  asyncHandler(async function confirmEmail(req: Request, res: Response) {
    const formData = req.body;
    const result = await UserService.confrimEmail(formData);
    res.status(result.code).json(result);
  })
);
// ***** getOTP
routes.get(
  "/user/getOTP/:email",
  asyncHandler(async function getOTP(req: Request, res: Response) {
    const formData = req.params.email;
    const verify_code = getUniqueCodev3();
    const result = await UserService.getVerifyCode(formData, verify_code);
    const buildResponse = await BuildResponse.get(result);
    res.json(buildResponse);
  })
);
// ***** updateProfile
routes.put(
  `/user/updateProfile`,
  asyncHandler(async function updateProfileUser(req: Request, res: Response) {
    const formData = req.body;
    const result = await UserService.updateProfileuser(formData);
    const buildResponse = await BuildResponse.get(result);
    res.json(buildResponse);
  })
);

// ***** forgot-passsword

routes.get(
  "/user/forgot-passsword/:email",
  asyncHandler(async function forgetPsssword(req: any, res: any) {
    const email = req.params.email;
    const data = await UserService.sendFrogetPasswordToken(email);
    const buildResponse = await BuildResponse.get(data);
    res.json(buildResponse);
  })
);

routes.post(
  `/user/change-password`,
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const getData = await UserService.changePassword(data);
    const buildResponse = BuildResponse.get(getData);
    res.json(buildResponse);
  })
);
