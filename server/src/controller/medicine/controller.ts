import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { BuildResponse } from "../../modules/response/app_response";
import { MedicineService } from "./service";
import { Request, Response } from "express";

router.get(
  "/medicine",
  asyncHandler(async function getMedicine(req: any, res: any) {
    const data = await MedicineService.getMedicine();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

router.put(
  "/medicine/:id/favorite",
  asyncHandler(async function updateIsFavorite(
    req: Request,
    res: Response
  ): Promise<any> {
    const { isFavorite } = req.body; // Get the isFavorite value from the request body
    const { id } = req.params;
    const data = await MedicineService.updateIsFavorite(id, isFavorite);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
