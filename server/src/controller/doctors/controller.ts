import multer from "multer";
import asyncHandler from "../../helper/async-handler";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";
import { DoctorsService } from "./service";
import { Request, Response } from "express";




// **** GetAll
routes.get(
  "/admin/doctors",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const data = 
    await DoctorsService.getDoctors();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

// **** checkPhoneNumberExists
routes.get(
  "/admin/check-phone/:phone",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const mobile = req.params.mobile;
    const data = await DoctorsService.checkDoctorPhoneNumberExists(mobile);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return buildResponse;
    }else{
      return false
    }
  })
);

// **** add-doctor
routes.post(
  `/admin/add-doctor`,
  asyncHandler(async function addDocror(req: Request, res: Response) {
    const formData = req.body;
    const data = await DoctorsService.registerDoctor(formData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return formData;
  })
);


routes.get(
  `/admin/doctor-detial/:doctorId`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const doctorId = +req.params.doctorId;
    const data = await DoctorsService.doctorDetial(doctorId);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return;
  })
);



// **** updatePatient
routes.put(
  "/admin/updateDoctor",
  asyncHandler(async function updateDocror(req: Request, res: Response) {
    const formData = req.body;
    const data = await DoctorsService.updateDoctor(formData);
    const buildResponse = BuildResponse.updated(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return formData;
  })
);
