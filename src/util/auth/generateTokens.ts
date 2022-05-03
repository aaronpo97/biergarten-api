import { env } from 'process';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { generateAccessTokenFn, generateRefreshTokenFn, TokenInterface } from './types/index';

import User from '../../database/model/User';
import ServerError from '../error/ServerError';

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = env;

export const generateRefreshToken: generateRefreshTokenFn = async (user) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('A refresh token secret was not found as an environment variable.');
  }

  const token = jwt.sign({ audience: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '43200m' });

  return token;
};

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
