import asyncHandler from "../../helper/async-handler";
import routes from "../../routes/public";
import { Request, Response } from "express";
import PatientService from "./services";
import BuildResponse from "../../modules/response/app_response";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgProfile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImgProfile = multer({ storage });

// **** GetAll
routes.get(
  "/admin/patients",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const data = await PatientService.getPatients();
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
    const data = await PatientService.checkExistMobile(mobile);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return buildResponse;
    }else{
      return false
    }
  })
);

// **** add-patient
routes.post(
  `/admin/add-patient`,
  asyncHandler(async function addPatient(req: Request, res: Response) {
    const formData = req.body;
    const data = await PatientService.registerPatient(formData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return formData;
  })
);

// **** GetPatientDetial
routes.get(
  `/admin/patient-detial/:patientId`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const patientId = +req.params.patientId;
    const data = await PatientService.patientDetial(patientId);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return;
  })
);
// **** uploadImage
routes.post(
  "/admin/uploadImage",
  uploadImgProfile.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({
      message: "File uploaded seccessfully",
      filename: req.file.filename,
    });
    const imagePath = req.file.path;
    res.json({ imagePath });
  }
);
// **** updatePatient
routes.put(
  "/admin/updatePatient",
  asyncHandler(async function updatePatient(req: Request, res: Response) {
    const formData = req.body;
    const data = await PatientService.updatePatient(formData);
    const buildResponse = BuildResponse.updated(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return formData;
  })
);
// **** deletePatient
routes.delete(
  "/admin/deletePatient/:idPateint",
  asyncHandler(async function deletePatient(
    req: Request,
    res: Response
  ): Promise<any> {
    const idPateint = +req.params.idPateint;
    await PatientService.deletePatient(idPateint);
    const buildResponse = BuildResponse.deleted(idPateint);
    return res.status(200).json(buildResponse);
  })
);
