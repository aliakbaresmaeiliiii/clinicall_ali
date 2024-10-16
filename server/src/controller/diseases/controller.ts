import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { DiseasesService } from "./service";



router.get(
  "/getAllDiseases",
  asyncHandler(async (req: any, res: any) => {
    const data = await DiseasesService.getAllDiseases();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
