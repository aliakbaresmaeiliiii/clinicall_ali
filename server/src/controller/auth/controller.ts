import { NextFunction, Request, Response } from "express";
import { BuildResponse } from "../../modules/response/app_response";

import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { AuthService } from "./service";
import { ClinicService } from "../clinic/service";
import { PatientService } from "../patients/services";

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
// ***** confirm *****
router.post(
  "/auth/verify-clinic-email",
  asyncHandler(async function verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, verify_code } = req.body;

    const data = await AuthService.confirmClinicEmail({email, verify_code});
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
    const data = await AuthService.confirmPatientEmail({email, verify_code});
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
