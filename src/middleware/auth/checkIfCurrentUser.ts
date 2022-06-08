import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';
import { UserMiddlewareFn } from './types/authMiddlewareTypes';

const checkIfCurrentUser: UserMiddlewareFn = (req, res, next) => {

  const currentUser = req.currentUser as User;
  const { userId: queriedUserId } = req.params;

  if (!isValidUuid(queriedUserId)) {
    throw new ServerError('The provided user id is invalid.', 400);
  }

  if (currentUser.id !== queriedUserId) {
    throw new ServerError('You are not authorized to do that.', 403);
  }

  next();
};

export default checkIfCurrentUser;
