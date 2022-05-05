import { env } from 'process';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { generateAccessTokenFn, generateRefreshTokenFn, TokenInterface } from './types/index';

import User from '../../database/model/User';
import ServerError from '../error/ServerError';

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = env;

/**
 * Helper function to generate refresh tokens.
 *
 * Takes in the user object and signs a jwt using a refresh token secret found in the environment
 * variables. Encodes the user object into `{ audience: user.id }`into the JWT.
 */
export const generateRefreshToken: generateRefreshTokenFn = async (user) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('A refresh token secret was not found as an environment variable.');
  }

  const token = jwt.sign({ audience: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '43200m' });

  return token;
};

/**
 * Helper function to generate an access token.
 *
 * It first verifies the refresh token using the `REFRESH_TOKEN_SECRET` and then if valid, will
 * generate a new access token catered to the `audience` value encoded in the jwt.
 */
export const generateAccessToken: generateAccessTokenFn = async (refreshToken) => {
  try {
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error('An access token secret was not found as an environment variable.');
    }
    if (!REFRESH_TOKEN_SECRET) {
      throw new Error('A refresh token secret was not found as an environment variable.');
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as TokenInterface;

    const user = await User.findOneBy({ id: decoded.audience });
    if (!user) throw new ServerError('Invalid JWT.', 401);

    return jwt.sign({ audience: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
  } catch (error) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      throw new ServerError('Your refresh token is expired.', 401);
    }
    throw error;
  }
};
