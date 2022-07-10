import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';

import { MiddlewareFn } from './types/authMiddlewareTypes';

/**
 * Middleware function to get the current authenticated user to be appended to request
 * object. This function must be invoked before checkTokens or else it will throw an error.
 *
 * @throws ServerError with status 500 if this function is invoked before checkTokens
 *   (causing the decoded access token to not be appended to the request object.)
 * @throws ServerError with status 400 if a user with the client provided credentials
 *   could not be found.
 */
const getCurrentUser: MiddlewareFn = async (req, res, next) => {
  const audience = req.decodedAccessToken?.audience as string | undefined;

  if (!audience || !isValidUuid(audience)) {
    throw new ServerError(
      'Something went wrong on our end. Please reauthenticate your request.',
      500,
    );
  }
  const currentUser = await User.findOne({
    where: { id: audience },
    select: ['id', 'username', 'email', 'joinedDate', 'accountConfirmed'],
  });
  if (!currentUser) {
    throw new ServerError('Could not find a user with your credentials.', 400);
  }

  req.currentUser = currentUser;

  next();
};

export default getCurrentUser;
