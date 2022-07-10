import ServerError from '../../util/error/ServerError';
import { MiddlewareFn } from './types/authMiddlewareTypes';

/**
 * Middleware function that checks if the currently authenticated user has confirmed their
 * account via email. This middleware function must be invoked after getCurrentUser.
 *
 * @throws ServerError with status 500 if this function is invoked prior to getCurrentUser.
 * @throws ServerError with status 403 if the currently authenticated user has not
 *   confirmed their account.
 */
const checkIfUserIsConfirmed: MiddlewareFn = (req, res, next) => {
  const { currentUser } = req;

  if (!currentUser) {
    throw new ServerError('Something went wrong.', 500);
  }

  if (!currentUser.accountConfirmed) {
    throw new ServerError('Cannot access route as your account is not confirmed.', 403);
  }

  next();
};

export default checkIfUserIsConfirmed;
