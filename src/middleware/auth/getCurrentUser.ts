import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';

import { MiddlewareFn } from './types/authMiddlewareTypes';

const getCurrentUser: MiddlewareFn = async (req, res, next) => {
  /**
   * @todo Append req.decoded and req.currentUser onto the request object to avoid any
   *   future type errors from the typescript compiler.
   */

  const currentUser = await User.findOne({
    // @ts-expect-error
    where: { id: req.decodedAccessToken.audience },
    select: ['id', 'username', 'email', 'joinedDate', 'accountConfirmed'],
  });
  if (!currentUser) {
    throw new ServerError(
      'An invalid user id was passed in as the audience for a JSON web token. Please reauthenticate.',
      401,
    );
  }

  // @ts-expect-error
  req.currentUser = currentUser;

  next();
};

export default getCurrentUser;
