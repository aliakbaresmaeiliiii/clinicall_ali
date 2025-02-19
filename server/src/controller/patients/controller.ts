import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { Request, Response } from "express";
import { PatientService } from "./services";
import { BuildResponse } from "../../modules/response/app_response";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImgProfile = multer({ storage });

// **** GetAll
router.get(
  "/admin/patients",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const data = await PatientService.getPatients();
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

// **** checkPhoneNumberExists
router.get(
  "/admin/check-phone/:phone",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const mobile = req.params.mobile;
    const data = await PatientService.checkExistMobile(mobile);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return buildResponse;
    } else {
      return false;
    }
  })
);

// **** add-patient
// router.post(
//   `/admin/add-patient`,
//   asyncHandler(async function addPatient(req: Request, res: Response) {
//     const formData = req.body;
//     const data = await PatientService.registerPatient(formData);
//     const buildResponse = BuildResponse.get(data);
//     if (buildResponse) {
//       return res.status(200).json(buildResponse);
//     }
//     return formData;
//   })
// );

// **** GetPatientDetial
router.get(
  `/admin/patient-detial/:patientId`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const patientId = +req.params.patientId;
    const data = await PatientService.patientDetial(patientId);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
// **** uploadImage
// routes.post(
//   "/admin/uploadImage",
//   uploadImgProfile.single("file"),
//   (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
//     res.json({
//       message: "File uploaded seccessfully",
//       filename: req.file.filename,
//     });
//     const imagePath = req.file.path;
//     res.json({ imagePath });
//   }
// );
// **** updatePatient
router.put(
  "/admin/updatePatient",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const formData = req.body;
    const data = await PatientService.updatePatient(formData);
    const buildResponse = BuildResponse.updated(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
// **** deletePatient
router.delete(
  "/admin/deletePatient/:idPateint",
  asyncHandler(async function deletePatient(
    req: Request,
    res: Response
  ): Promise<any> {
    const idPateint = +req.params.idPateint;
    await PatientService.deletePatient(idPateint);
    const buildResponse = BuildResponse.deleted(idPateint);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.post(
  '/admin/add_favorite',
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { patient_id, doctor_id } = req.body;
    const formData = {patient_id,doctor_id}
    const data = await PatientService.addFavorite(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
