import asyncHandler from "../../helper/async-handler";
import Authorization from "../../middlewares/authorization";
import routes from "../../routes";
import { Request, Response } from 'express'

// routes.post(
//     '/refresh-token',
//     Authorization,
//     asyncHandler(async function createData(req: Request, res: Response) {
//       const formData = req.body
  
//       const data = await RefreshTokenService.create(formData)
//       const buildResponse = BuildResponse.created({ data })
  
//       return res.status(201).json(buildResponse)
//     })
//   )