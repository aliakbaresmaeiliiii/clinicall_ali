import {asyncHandler} from "../../helper/async-handler";
import {router} from "../../routes/public";
import { NavItemService } from "./service";
import {BuildResponse} from "../../modules/response/app_response";

router.get(
  "/navItem",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const data = await NavItemService.getAllNavItems();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);
