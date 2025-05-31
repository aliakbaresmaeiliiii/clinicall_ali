import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { searchEntities } from "../../scripts/syncDoctors";





router.get(
  "/doctors/search",
  asyncHandler(async (req: any, res: any) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }
    const doctors = await searchEntities(query);
    const buildResponse = BuildResponse.get(doctors);
    res.status(buildResponse.code).json(buildResponse);

  })
);
