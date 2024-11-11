

import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { PrescriptionMedicineService } from "./services";

router.post(
  "/prescription-medicine",
  asyncHandler(async function insertEvent(req: any, res: any) {
    const eventData = req.body;
    const data = await PrescriptionMedicineService.AddPrescriptionMedicne(eventData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

