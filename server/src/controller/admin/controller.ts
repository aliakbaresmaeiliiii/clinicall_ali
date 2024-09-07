import { Request, Response } from "express";
import { UserAdmin } from "./service";
import {BuildResponse} from "../../modules/response/app_response";
import {router} from "../../routes/public";


router.get(
  `/getUserAdmin`,
  async function userAdmin(req: Request, res: Response) {
    const data = await UserAdmin.getUserAdmin();
    const buildResponse = BuildResponse.get(data);
    res.status(buildResponse.code).json(buildResponse);
  }
);
