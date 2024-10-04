import { Request, Response } from "express";
import {BuildResponse} from "../../modules/response/app_response";

import {AuthService} from "./service";
import {asyncHandler} from "../../helper/async-handler";
import { router } from "../../routes/public";

router.post(
  `/auth/sign-up`,
  asyncHandler(async function signUp(req: Request, res: Response) {
    const formData = req.body;
    const data = await AuthService.signUp(formData);
    const buildResponse = BuildResponse.get(data);
    res.status(buildResponse.code).json(buildResponse);
  })
);

router.post(
  "/sign-in",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const formData = req.body;
    const data = await AuthService.signIn(formData);
    const buildResponse = await BuildResponse.get(data);
    res.status(buildResponse.code).json(buildResponse);
  })
);

// router.post(
//   `/auth/refresh-token`,
//   Authorization,
//   asyncHandler(async function authRefreshToken(req: Request, res: Response) {
//     const { email, refreshToken } = req.body();
//   })
// );
