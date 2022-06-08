import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';

import { MiddlewareFn } from './types/authMiddlewareTypes';

const getCurrentUser: MiddlewareFn = async (req, res, next) => {

  const audience = req.decodedAccessToken?.audience as string;
  const currentUser = await User.findOne({
    where: { id: audience },
    select: ['id', 'username', 'email', 'joinedDate', 'accountConfirmed'],
  });
  if (!currentUser) {
    throw new ServerError(
      'An invalid user id was passed in as the audience for a JSON web token. Please reauthenticate.',
      401,
    );
  }

  req.currentUser = currentUser;

  next();
};

export default getCurrentUser;
