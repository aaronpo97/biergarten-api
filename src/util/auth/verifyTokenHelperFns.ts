import { env } from 'process';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ServerError from '../error/ServerError';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CONFIRMATION_TOKEN_SECRET } = env;

/**
 * Verifies a JSON Web Token (JWT) against the access token secret that is set in the
 * environment variables.
 *
 * @param accessToken The JWT you wish to verify against the access token secret.
 * @returns A payload containing the decoded values (i.e. user id) from the JWT.
 * @throws ServerError with status 500 if there is no access token secret stored in the
 *   environment variables.
 */
export const verifyAccessToken = async (accessToken: string) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new ServerError('Something went wrong.', 500);
  }

  const decodedAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload;
  return decodedAccessToken;
};

/**
 * Verifies a JSON Web Token (JWT) against the refresh token secret that is set in the
 * environment variables.
 *
 * @param refreshToken The JWT you wish to verify against the refresh token secret.
 * @throws ServerError with status 500 if there is no refresh token secret stored in the
 *   environment variables.
 * @returns A payload containing the decoded values (i.e. user id) from the JWT.
 */
export const verifyRefreshToken = async (refreshToken: string) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new ServerError('Something went wrong.', 500);
  }

  const decodedRefreshToken = jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
  ) as JwtPayload;
  return decodedRefreshToken;
};

/**
 * Verifies a JSON Web Token (JWT) against the confirmation token set in the environment variables.
 *
 * @param confirmationToken The JWT you wish to verify against the confirmation token secret.
 * @returns A payload containing the decoded values (i.e. user id) from the JWT.
 * @throws SeverError with status 500 if there is no confirmation token secret stored in
 *   the environment variables.
 */
export const verifyConfirmationToken = async (confirmationToken: string) => {
  if (!CONFIRMATION_TOKEN_SECRET) {
    throw new ServerError('Something went wrong.', 500);
  }

  const decodedConfirmationToken = jwt.verify(
    confirmationToken,
    CONFIRMATION_TOKEN_SECRET,
  ) as JwtPayload;

  return decodedConfirmationToken;
};
