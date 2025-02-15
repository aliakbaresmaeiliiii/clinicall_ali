import { Request, Response } from "express";
import { asyncHandler } from "../../helper/async-handler";
import { Authorization } from "../../middlewares/authorization";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { DoctorsService } from "./service";

router.get(
  "/doctors",
  asyncHandler(async (req: any, res: any) => {
    const data = await DoctorsService.getDoctors();
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.get(
  "/getMostPopularDoctor",
  asyncHandler(async (req: any, res: any) => {
    const data = await DoctorsService.getMostPopularDoctors();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

router.get(
  "/admin/check-phone/:phone",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const mobile = req.params.mobile;
    const data = await DoctorsService.checkDoctorPhoneNumberExists(mobile);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return buildResponse;
    } else {
      return false;
    }
  })
);

router.post(
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

router.get(
  `/admin/doctor-detial/:doctorId`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const doctorId = +req.params.doctorId;
    const data = await DoctorsService.doctorDetial(doctorId);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);

router.put(
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

router.post(
  `/admin/countDoctorClick`,
  asyncHandler((req: Request, res: Response) => {
    const id = req.body.id;
    const data = DoctorsService.logDoctorClick(id);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);



router.post(
  `/admin/addComment`,
  asyncHandler(async (req: Request, res: Response) => {
    const comment = req.body.comment;
    const data = await DoctorsService.addComment(comment);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);

router.get(
  `/admin/getSpecialties`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const data = await DoctorsService.getSpecialties();
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);

router.get(
  `/get-sub-specialties/:specialtyId`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const specialtyId = parseInt(req.params.specialtyId, 10);

    if (isNaN(specialtyId)) {
      return res.status(400).json({ error: "Invalid specialty ID" });
    }

    const data = await DoctorsService.getSubSpecialtiesById(specialtyId);
    const buildResponse = BuildResponse.get(data);
    res.status(buildResponse.code).json(buildResponse);
  })
);

router.get(
  `/admin/filterSpecialtyById/:id`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const queryParams = +req.params.id;
    const data = await DoctorsService.filterSpecialtyById(queryParams);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);
router.get(
  `/admin/filterServicesById/:id`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const queryParams = +req.params.id;
    const data = await DoctorsService.filterServicesById(queryParams);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);
router.post(
  `/admin/insertReviews`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const dataReviews = req.body;
    const data = await DoctorsService.insertReviews(dataReviews);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);
router.get(
  `/getReviews`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const data = await DoctorsService.getReviews();
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);

router.get(
  "/doctors/:id/schedule-availability",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    const consultationType = req.query.consultationType;
    const data = await DoctorsService.doctorScheduleAvailability(
      id,
      consultationType
    );
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);
router.get(
  "/doctors/:scheduleID/schedule-time-availability",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const scheduleID = +req.params.scheduleID;
    const data = await DoctorsService.doctorScheduleTimeAvailability(
      scheduleID
    );
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);

router.post(
  `/doctors/:doctor_id/like`,
  asyncHandler(async (req: Request, res: Response) => {
    const likes = req.body.formData;
    const data = await DoctorsService.toggleLike(likes);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);
