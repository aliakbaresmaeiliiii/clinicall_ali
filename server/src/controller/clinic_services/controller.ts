import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { Request, Response } from "express";
import { clinicService } from "./service";
import { BuildResponse } from "../../modules/response/app_response";

// router.get(
//   "/getClinicServices",
//   asyncHandler(async (req: Request, res: Response) => {
//     const data = await clinicService.getClinicService();
//     const buildResponse = BuildResponse.get(data);
//     if (buildResponse) {
//       return res.status(200).json(buildResponse);
//     }
//     return buildResponse;
//   })
// );
