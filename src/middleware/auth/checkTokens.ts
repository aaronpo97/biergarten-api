import 'dotenv/config';

import { generateAccessToken } from '../../util/auth/generateTokens';
import ServerError from '../../util/error/ServerError';
import { MiddlewareFn } from './types/authMiddlewareTypes';
import { verifyAccessToken } from '../../util/auth/verifyTokenHelperFns';

/**
 * Middleware to first check an access token to see if it is valid, and if it is expired,
 * will trigger a function to regenerate the access token with the given refresh token.
 *
 * @throws ServerError with status 401 if the x-access-token (i.e. the access token) was
 *   not provided with the request headers.
 * @throws ServerError with status 401 if the x-auth-token (i.e. the refresh token)was not
 *   provided with the request headers.
 */
const checkTokens: MiddlewareFn = async (req, res, next) => {
  try {
    const accessToken = req.headers['x-access-token'] as string | undefined;
    if (!accessToken) {
      throw new ServerError('The access token was not provided.', 401);
    }
    req.decodedAccessToken = await verifyAccessToken(accessToken);
    next();
  } catch (error) {
    try {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        const refreshToken = req.headers['x-auth-token'] as string | undefined;
        if (!refreshToken) {
          throw new ServerError(
            'No refresh token was provided. Authentication failed.',
            401,
          );
        }

        const newAccessToken = await generateAccessToken(refreshToken);
        const decodedAccessToken = await verifyAccessToken(newAccessToken);

        req.newAccessToken = newAccessToken;
        req.decodedAccessToken = decodedAccessToken;

        next();
        return;
      }
      throw error;
    } catch (err) {
      next(err);
    }
  }
};
export default checkTokens;
