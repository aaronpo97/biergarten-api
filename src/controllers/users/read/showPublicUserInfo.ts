import AppDataSource from '../../../database/AppDataSource';
import Beer from '../../../database/model/Beer';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { UserRequestHandler } from '../types/RequestHandlers';

/**
 * Business logic for showing the public information of a given user.
 *
 * The route takes the user id as a request parameter and will throw an error code 400 if
 * the given id is not a valid UUID. If the given id is a valid UUID but a user could not
 * be found, the server will return error status code 400.
 */
const showPublicUserInfo: UserRequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidUuid(userId)) {
      throw new ServerError(
        'Could not access the public user info for a user with that id as it is invalid.',
        400,
      );
    }
    const queriedUser = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .select(['user.username', 'user.email'])
      .from(User, 'user')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!queriedUser) {
      throw new ServerError('Could not find a user with that id.', 404);
    }

    const queriedUserPosts = await AppDataSource.getRepository(Beer)
      .createQueryBuilder('beer')
      .where('beer.postedById = :id', { id: userId })
      .getMany();

    const successResponse = new SuccessResponse(
      `Sending the user with id: ${userId}`,
      200,
      { ...queriedUser, beerPosts: queriedUserPosts },
    );

    next(successResponse);
  } catch (e) {
    next(e);
  }
};

export default showPublicUserInfo;
