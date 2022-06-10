import ServerError from '../../util/error/ServerError';
import { MiddlewareFn } from './types/authMiddlewareTypes';

const checkIfUserIsConfirmed: MiddlewareFn = (req, res, next) => {
  const { currentUser } = req;

  if (!currentUser?.accountConfirmed) {
    throw new ServerError('Cannot access route as your account is not confirmed.', 403);
  }

  next();
};

export default checkIfUserIsConfirmed;
