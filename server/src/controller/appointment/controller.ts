import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { CalendarService } from "./service";

router.post(
  "/insertAppointment",
  asyncHandler(async function insertEvent(req: any, res: any) {
    const eventData = req.body;
    const data = await CalendarService.insertEvent(eventData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

router.get(
  "/getAppointment",
  asyncHandler(async function getEventData(req: any, res: any) {
    const data = await CalendarService.getEventData();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

router.delete(
  "/deleteAppointment/delete/:id",
  asyncHandler(async function deleteAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    await CalendarService.deleteAppointmentItem(id);
    const buildResponse = BuildResponse.deleted({});
    return res.status(200).json(buildResponse);
  })
);

router.put(
  "/updateAppointment/update",
  asyncHandler(async function updateAppointmentItem(
    req: Request,
    res: Response
  ): Promise<any> {
    const formData = req.body;
    const data = await CalendarService.updateAppointmentItem(formData);
    const buildResponse = BuildResponse.updated(data);
    return res.status(201).json(buildResponse);
  })
);
