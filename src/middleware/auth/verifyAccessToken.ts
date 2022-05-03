import { env } from 'process';
import jwt from 'jsonwebtoken';
import ServerError from '../../util/error/ServerError';

const verifyAccessToken = async (accessToken: string) => {
  const { ACCESS_TOKEN_SECRET } = env;
  if (!ACCESS_TOKEN_SECRET) {
    throw new ServerError('An access token secret was not found in .env', 500);
  }

  const decodedAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as string;
  return decodedAccessToken;
};

export default verifyAccessToken;
