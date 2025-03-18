import { Client } from "@elastic/elasticsearch";
import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";
import { searchDoctors } from "../../scripts/syncDoctors";
import { BuildResponse } from "../../modules/response/app_response";





router.get(
  "/doctors/search",
  asyncHandler(async (req: any, res: any) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const doctors = await searchDoctors(query);
    const buildResponse = BuildResponse.get(doctors);
    res.statu(buildResponse.code).json(buildResponse);
  })
);
