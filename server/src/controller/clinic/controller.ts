import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { ClinicService } from "./service";
import { Request, Response } from "express";

router.post(
  "/clinics/add",
  asyncHandler(async function addNewClinic(req: Request, res: Response) {
    const formData = req.body;
    const result = await ClinicService.insertClinic(formData);
    const buildResponse = await BuildResponse.get(result);
    if (buildResponse) {
      return buildResponse;
    }
    return result;
  })
);
