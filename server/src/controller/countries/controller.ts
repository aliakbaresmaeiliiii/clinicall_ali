import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { CountriesService } from "./services";



router.get(
  "/getAll-countries",
  asyncHandler(async (req: any, res: any) => {
    const data = await CountriesService.getAllCountries();
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
