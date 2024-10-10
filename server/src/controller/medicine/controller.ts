import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { BuildResponse } from "../../modules/response/app_response";
import { MedicineService } from "./service";

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
