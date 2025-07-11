import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { Request, Response } from "express";
import { PatientService } from "./services";
import { BuildResponse } from "../../modules/response/app_response";
import multer from "multer";
<<<<<<< HEAD
var Kavenegar = require("kavenegar");
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

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
  "/api/patients",
  asyncHandler(async function getNavItems(req: any, res: any) {
<<<<<<< HEAD
    const queryParams = req.query;
    const data = await PatientService.getPatients(queryParams);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.get(
  "/api/patient_detail/:patient_id",
  asyncHandler(async function getPatientDetail(req: any, res: any) {
    const query = +req.params.patient_id;
    const data = await PatientService.getPatientDetial(query);
=======
    const data = await PatientService.getPatients();
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

// **** checkPhoneNumberExists
<<<<<<< HEAD

=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
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
<<<<<<< HEAD
const otpStore = new Map<string, { code: string; expiresAt: number }>();
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

// **** add-patient
router.post(
  `/admin/add-patient`,
  asyncHandler(async function addPatient(req: Request, res: Response) {
    const formData = req.body;
<<<<<<< HEAD
    const stored = otpStore.get(formData.mobile);
    if (
      stored &&
      Date.now() < stored.expiresAt &&
      formData.code === stored.code
    ) {
      const data = await PatientService.registerPatient(formData);
      const buildResponse = BuildResponse.get(data);
      if (buildResponse) {
        return res.status(200).json(buildResponse);
      }
      return formData;
    } else {
      return res.status(400).json({ error: "The code is wrong" });
    }
  })
);

router.post("/send-code", (req, res) => {
  const { mobile } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(mobile, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
  sendOTP(mobile, code);
  res.json({ message: "OTP sent successfully" });
});

function sendOTP(mobile: string, code: string) {
  var api = Kavenegar.KavenegarApi({
    apikey:
      "47396E712B536F5359544A2F4B664F445078716A55353775785252724741372B4D563669614F686D424F383D",
  });
  api.Send({
    message: code,
    sender: "DoctorAli",
    receptor: mobile,
  });
}


=======
    const data = await PatientService.registerPatient(formData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return formData;
  })
);

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
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
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
<<<<<<< HEAD
  "/admin/add_favorite",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { patient_id, doctor_id } = req.body;
    const formData = { patient_id, doctor_id };
=======
  '/admin/add_favorite',
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { patient_id, doctor_id } = req.body;
    const formData = {patient_id,doctor_id}
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    const data = await PatientService.addFavorite(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
<<<<<<< HEAD
=======

  
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
);
