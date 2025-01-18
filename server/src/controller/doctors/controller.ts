import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { DoctorsService } from "./service";
import { Request, Response } from "express";

router.get(
  "/admin/doctors",
  asyncHandler(async (req: any, res: any) => {
    const data = await DoctorsService.getDoctors();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
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
    const doctor_id = req.body.doctor_id;
    const data = DoctorsService.logDoctorClick(doctor_id);
    const buildResponse = BuildResponse.get(data);
    res.status(200).json(buildResponse);
  })
);
router.post(
  `/admin/toggleLike`,
  asyncHandler(async (req: Request, res: Response) => {
    const likes = req.body;
    const data = await DoctorsService.toggleLike(likes);
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
  "/doctors/:doctor_id/schedule-availability",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const doctor_id = +req.params.doctor_id;
    const consultationType = req.query.consultationType;
    const data = await DoctorsService.doctorScheduleAvailability(
      doctor_id,
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

router.put(
  "/doctors/:timeID/booked",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const timeID = +req.params.timeID;
    const result = await DoctorsService.booked(timeID);
    const buildResponse = BuildResponse.updated(result);
    res.status(200).json(buildResponse);
  })
);
