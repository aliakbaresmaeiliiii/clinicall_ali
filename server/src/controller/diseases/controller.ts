import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { DiseasesService } from "./service";

router.get(
  "/getAllDiseases",
  asyncHandler(async (req: any, res: any) => {
    const data = await DiseasesService.getAllDiseases();
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);

  })
);
router.get(
  "/getDiseaseSubcategories/:id",
  asyncHandler(async (req: any, res: any) => {
    const disease_id = req.params.id;
    const data = await DiseasesService.getDiseaseSubcategories(disease_id);
    const buildResponse = BuildResponse.get(data);
    return res.status(buildResponse.code).json(buildResponse);

  })
);
