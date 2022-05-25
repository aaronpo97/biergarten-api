import 'dotenv/config';

import { generateAccessToken } from '../../util/auth/generateTokens';
import ServerError from '../../util/error/ServerError';
import { MiddlewareFn } from './types/authMiddlewareTypes';
import { verifyAccessToken } from '../../util/auth/verifyTokenHelperFns';

/**
 * Middleware to first check an access token to see if it is valid, and if it is expired,
 * will trigger a function to regenerate the access token with the given refresh token.
 */
const checkTokens: MiddlewareFn = async (req, res, next) => {
  try {
    const accessToken = req.headers['x-access-token'] as string | undefined;
    if (!accessToken) {
      throw new ServerError('The access token was not provided.', 401);
    }
    const decodedAccessToken = await verifyAccessToken(accessToken);

    /**
     * @todo Extend the request object to contain the decoded access token for subsequent
     *   middleware in each route. To be used to create a req.currentUser param which will
     *   be used to verify permissions for modifying resources.
     */

    // @ts-expect-error
    req.decodedAccessToken = decodedAccessToken;

next()
  } catch (error) {
    try {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        const refreshToken = req.headers['x-auth-token'] as string | undefined;
        if (!refreshToken) {
          throw new ServerError(
            'No refresh token was provided. Authentication failed.',
            400,
          );
        }

        const newAccessToken = await generateAccessToken(refreshToken);
        const decodedAccessToken = await verifyAccessToken(newAccessToken);

        /** @todo See above todo. */
        // @ts-expect-error
        req.decodedAccessToken = decodedAccessToken;

        next();
        return;
      }
      throw error;
    } catch (err) {
      next(err instanceof Error ? err : new ServerError('Something went wrong', 500));
    }
  }
};
export default checkTokens;
