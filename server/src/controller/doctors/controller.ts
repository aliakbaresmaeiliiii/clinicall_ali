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
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.get(
  "/admin/check-phone/:phone",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const mobile = req.params.mobile;
    const data = await DoctorsService.checkDoctorPhoneNumberExists(mobile);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.post(
  `/admin/add-doctor`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const formData = req.body;
    const data = await DoctorsService.registerDoctor(formData);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.get(
  `/admin/doctor-detial/:doctorId`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const doctorId = +req.params.doctorId;
    const data = await DoctorsService.doctorDetial(doctorId);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.put(
  "/admin/updateDoctor",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const formData = req.body;
    const data = await DoctorsService.updateDoctor(formData);
    const buildResponse = BuildResponse.updated(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.post(
  `/admin/countDoctorClick`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.body.id;
    const data = DoctorsService.recordDoctorProfileView(id);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.post(
  `/admin/addComment`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const comment = req.body.comment;
    const data = await DoctorsService.addComment(comment);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.get(
  `/admin/getSpecialties`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const data = await DoctorsService.getSpecialties();
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
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
    return res.status(buildResponse.code).json(buildResponse);
  })
);
router.get(
  `/admin/filterServicesById/:id`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const queryParams = +req.params.id;
    const data = await DoctorsService.filterServicesById(queryParams);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
router.post(
  `/admin/insertReviews`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const dataReviews = req.body;
    const data = await DoctorsService.insertReviews(dataReviews);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
router.get(
  `/getReviews`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const data = await DoctorsService.getReviews();
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.get(
  "/doctors/:id/doctor_schedules",
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const doctor_id = +req.params.id;
    const consultation_types = req.query.consultation_types;
    const data = await DoctorsService.doctorSchadules(
      doctor_id,
      consultation_types
    );
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
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
    return res.status(buildResponse.code).json(buildResponse);
  })
);

router.post(
  `/doctors/:doctor_id/like`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const likes = req.body.formData;
    const data = await DoctorsService.toggleLike(likes);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);


router.put(
  `/doctors/:id/booked`,
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    const data = await DoctorsService.booked(id);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
