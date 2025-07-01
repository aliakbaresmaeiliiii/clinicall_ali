import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { citiesService } from "./service";

router.get(
  "/getAllCities",
  asyncHandler(async (req: any, res: any) => {
    const filters = req.query; 
    const data = await citiesService.getAllCities(filters);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);
  })
);
router.get(
  "/filtered_neighbor/:id",
  asyncHandler(async (req: any, res: any) => {
    const city_id = +req.params.id;
    const data = await citiesService.filtered_neighbor(city_id);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);

  })
);
