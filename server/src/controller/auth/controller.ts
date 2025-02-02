import { NextFunction, Request, Response } from "express";
import { BuildResponse } from "../../modules/response/app_response";

import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { AuthService } from "./service";

// ***** sign-up *****
router.post(
  `/auth/sign-up`,
  asyncHandler(async function signUp(req: any, res: any) {
    const formData = req.body;
    const data = await AuthService.signUp(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

// ***** confirm *****
router.post(
  "/user/confirm",
  asyncHandler(async function confirmEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const formData = req.body;
      const data = await AuthService.confirmEmail(formData);

      if (!data) {
        return res
          .status(400)
          .json({ code: 400, message: "Invalid email or verification code" });
      }

      const buildResponse = BuildResponse.get(data);
      res.status(buildResponse.code).json(buildResponse);
    } catch (error) {
      next(error);
    }
  })
);

// ***** clinic-sign-in *****
router.post(
  "/auth/clinic-sign-in",
  asyncHandler(async function clinicSignIn(req: any, res: any) {
    const formData = req.body;
    const data = await AuthService.clinicSignIn(formData);
    const buildResponse = await BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
// ***** doctor-sign-in *****
router.post(
  "/auth/doctor-sign-in",
  asyncHandler(async function doctorSignIn(req: any, res: any) {
    const formData = req.body;
    const data = await AuthService.doctorSignIn(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
router.post(
  "/auth/patient-sign-in",
  asyncHandler(async function patientSignIn(req: any, res: any) {
    const formData = req.body;
    const data = await AuthService.patientSignIn(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
