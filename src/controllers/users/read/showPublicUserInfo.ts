import AppDataSource from '../../../database/AppDataSource';
import Beer from '../../../database/model/Beer';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { UserRequestHandler } from '../types/RequestHandler';

const showPublicUserInfo: UserRequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
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
