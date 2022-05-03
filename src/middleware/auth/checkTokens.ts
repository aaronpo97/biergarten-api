import 'dotenv/config';
import { RequestHandler } from 'express';

import { generateAccessToken } from '../../util/auth/generateTokens';
import ServerError from '../../util/error/ServerError';
import verifyAccessToken from './verifyAccessToken';

const checkTokens: RequestHandler<{}, {}, {}> = async (req, res, next) => {
  try {
    const accessToken = req.headers['x-access-token'] as string | undefined;
    if (!accessToken) {
      throw new ServerError('The access token was not provided.', 401);
    }
    const decodedAccessToken = await verifyAccessToken(accessToken);

    // @ts-expect-error
    req.decodedAccessToken = decodedAccessToken;
  } catch (error) {
    try {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        const refreshToken = req.headers['x-auth-token'] as string | undefined;
        if (!refreshToken) {
          throw new ServerError('No refresh token was provided. Authentication failed.', 400);
        }

        const newAccessToken = await generateAccessToken(refreshToken);
        const decodedAccessToken = await verifyAccessToken(newAccessToken);

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
