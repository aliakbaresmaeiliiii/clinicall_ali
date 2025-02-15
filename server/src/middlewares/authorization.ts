import { NextFunction, Response } from "express";
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { extractToken } from "../helper/token";
// export async function Authorization(req: any, res: Response, next: NextFunction) {
//   const getToken = currentToken(req);
//   const token = verifyAccessToken(getToken);

//   if (isEmpty(token?.data)) {
//     return res.status(401).json({
//       code: 401,
//       message: token?.message,
//     })
//   }

//   req.setState({ userLogin: token?.data })
//   next()
// }


export function Authorization(
  req: any ,
  res: Response,
  next: NextFunction
) {
  const token = extractToken(req);
  if (!token) {
    return res
      .status(401)
      .json({ code: 401, message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN as string
    );
    req.user = decoded; // ✅ Attach user data to `req`
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({ code: 401, message: "Unauthorized: Token expired" });
    }
    if (error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
      return res
        .status(403)
        .json({ code: 403, message: "Forbidden: Invalid token" });
    }
    return res
      .status(500)
      .json({ code: 500, message: "Internal Server Error" });
  }
}
