import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { citiesService } from "./service";

router.get(
  "/getAllCities",
  asyncHandler(async (req: any, res: any) => {
    const data = await citiesService.getAllCities();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
router.get(
  "/filtered_neighbor/:id",
  asyncHandler(async (req: any, res: any) => {
    const city_id = +req.params.id;
    const data = await citiesService.filtered_neighbor(city_id);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
