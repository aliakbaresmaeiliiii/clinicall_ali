import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { InsuranceService } from "./service";

router.get(
  "/getAllInsurances",
  asyncHandler(async (req: any, res: any) => {
    const data = await InsuranceService.getAllInsurances();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);