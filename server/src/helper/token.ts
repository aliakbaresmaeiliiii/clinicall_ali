import { Request } from 'express'
import jwt, {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from 'jsonwebtoken'
import { isEmpty } from 'lodash-es'

require('dotenv').config()

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env

/**
 *
 * @param headers - Get Token from headers
 */
function getToken(headers: any) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ')

    // Check Bearer xxx || JWT xxx
    if (parted[0] === 'Bearer' || parted[0] === 'JWT') {
      if (parted.length === 2) {
        return parted[1]
      }
    }

    return null
  }
  return null
}

/**
 *
 * @param req - Request
 */
 function extractToken(req: Request): string | null {
  const tokenFromCookie = req.cookies?.token;
  const tokenFromHeader = req.headers.authorization?.split(" ")[1]; // Get Bearer token

  return tokenFromCookie || tokenFromHeader || null;
}

/**
 *
 * @param token - Verify Token
 */
function verifyAccessToken(token: string) {
  try {
    if (!token) {
      return { data: null, message: 'Unauthorized!' }
    }

    const data = jwt.verify(token, JWT_SECRET_ACCESS_TOKEN)
    return { data, message: 'Token is verify' }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { data: null, message: `Token ${err.message}` }
    }

    if (err instanceof JsonWebTokenError) {
      return { data: null, message: `Token ${err.message}` }
    }

    if (err instanceof NotBeforeError) {
      return { data: null, message: `Token ${err.message}` }
    }
  }
}

/**
 *
 * @param token - Verify Token
 */
function verifyRefreshToken(token: string) {
  try {
    if (!token) {
      return { data: null, message: 'Unauthorized!' }
    }

    const data = jwt.verify(token, JWT_SECRET_REFRESH_TOKEN)
    return { data, message: 'Token is verify' }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { data: null, message: `Token ${err.message}` }
    }

    if (err instanceof JsonWebTokenError) {
      return { data: null, message: `Token ${err.message}` }
    }

    if (err instanceof NotBeforeError) {
      return { data: null, message: `Token ${err.message}` }
    }
  }
}

export { getToken, extractToken, verifyAccessToken, verifyRefreshToken }
