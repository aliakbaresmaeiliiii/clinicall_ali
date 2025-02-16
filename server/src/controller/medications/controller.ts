import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { BuildResponse } from "../../modules/response/app_response";
import { MedicineService } from "./service";
import { Request, Response } from "express";

router.get(
  "/medications",
  asyncHandler(async function getMedicine(req: any, res: any) {
    const data = await MedicineService.getMedicine();
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);

  })
);

router.put(
  "/medications/:id/favorite",
  asyncHandler(async function updateIsFavorite(
    req: Request,
    res: Response
  ): Promise<any> {
    const { isFavorite } = req.body; // Get the isFavorite value from the request body
    const medication_id = req.params.id;
    const data = await MedicineService.updateIsFavorite(medication_id, isFavorite);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);

  })
);
