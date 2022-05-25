import { env } from 'process';
import jwt from 'jsonwebtoken';
import ServerError from '../error/ServerError';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CONFIRMATION_TOKEN_SECRET } = env;

export const verifyAccessToken = async (accessToken: string) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new ServerError('An access token secret was not found in .env', 500);
  }

  const decodedAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as string;
  return decodedAccessToken;
};
export const verifyRefreshToken = async (refreshToken: string) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new ServerError('A refresh token secret was not found in .env', 500);
  }

  const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as string;
  return decodedRefreshToken;
};
export const verifyConfirmationToken = async (confirmationToken: string) => {
  if (!CONFIRMATION_TOKEN_SECRET) {
    throw new ServerError('A confirmation token secret was not found in .env', 500);
  }

  const decodedConfirmationToken = jwt.verify(
    confirmationToken,
    CONFIRMATION_TOKEN_SECRET,
  ) as string;

  return decodedConfirmationToken;
};
