import { NextFunction, Request, Response } from "express";
import { BuildResponse } from "../../modules/response/app_response";

import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { AuthService } from "./service";
import { ClinicService } from "../clinic/service";
import { PatientService } from "../patients/services";
import axios from "axios";

// ***** clinic sign-up *****
router.post(
  `/auth/clinic/register`,
  asyncHandler(async function clinicRegister(req: any, res: any) {
    const formData = req.body;
    const data = await ClinicService.registerClinic(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
// ***** patient sign-up *****
router.post(
  `/auth/patient/register`,
  asyncHandler(async function patientRegister(req: any, res: any) {
    const formData = req.body;
    const data = await PatientService.registerPatient(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.post(
  "/auth/verify-recaptcha",
  asyncHandler(async function verifyRecaptcha(req: any, res: any) {
    const { token } = req.body;
    const secretKey = '6Lfts_AqAAAAAJ6Rct_LzxLQC5Ox5G1tOJHS_Bhr';

    if (!token) {
      return res.status(400).json({ success: false, message: "Token is required" });
    }

    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
      );

      if (response.data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, message: "Recaptcha verification failed" });
      }
    } catch (error) {
      console.error("Recaptcha verification error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

// ***** confirm *****
router.post(
  "/auth/verify-clinic-email",
  asyncHandler(async function verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, verify_code } = req.body;

    const data = await AuthService.confirmClinicEmail({ email, verify_code });
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
router.post(
  "/auth/verify-patient-email",
  asyncHandler(async function verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, verify_code } = req.body;
    const data = await AuthService.confirmPatientEmail({ email, verify_code });
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
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

// router.get(
//   "/auth/verify-email-code",
//   asyncHandler(async function confirmEmailCode(req: any, res: any) {
//     const email = req.query.email;
//     const data = await AuthService.confirmEmailCode(email);
//     const buildResponse = BuildResponse.get(data);
//     return res.status(buildResponse.code).json(buildResponse);
//   })
// );
