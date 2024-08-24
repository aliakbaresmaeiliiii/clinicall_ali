import { Request, Response } from "express";
import { UserAdmin } from "./service";
import BuildResponse from "../../modules/response/app_response";
import routes from "../../routes/public";


routes.get(
  `/getUserAdmin`,
  async function userAdmin(req: Request, res: Response) {
    const data = await UserAdmin.getUserAdmin();
    const buildResponse = BuildResponse.get(data);
    res.status(buildResponse.code).json(buildResponse);
  }
);
