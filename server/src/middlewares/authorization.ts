import { NextFunction, Response } from "express";
import { isEmpty } from "lodash-es";
import { currentToken, verifyAccessToken } from "../helper/token";

export async function Authorization(req: any, res: Response, next: NextFunction) {
  const getToken = currentToken(req);
  const token = verifyAccessToken(getToken);

  if (isEmpty(token?.data)) {
    return res.status(401).json({
      code: 401,
      message: token?.message,
    })
  }

  req.setState({ userLogin: token?.data })
  next()
}
