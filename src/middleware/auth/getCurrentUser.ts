import { RequestHandler } from 'express-serve-static-core';
import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';
import logger from '../../util/logger';

const getCurrentUser: RequestHandler<unknown, unknown, unknown> = async (
  req,
  res,
  next,
) => {
  /**
   * @todo Append req.decoded and req.currentUser onto the request object to avoid any
   *   future type errors from the typescript compiler.
   */

  const currentUser = await User.findOne({
    // @ts-expect-error
    where: { id: req.decodedAccessToken.audience },
    select: ['id', 'username', 'email', 'joinedDate'],
  });
  if (!currentUser) {
    throw new ServerError(
      'An invalid user id was passed in as the audience for a JSON web token. Please reauthenticate.',
      401,
    );
  }

  // @ts-expect-error
  req.currentUser = currentUser;

  logger.info(currentUser);

  next();
};

export default getCurrentUser;