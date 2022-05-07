import { validate as isValidUUID } from 'uuid';
import AppDataSource from '../../../database/AppDataSource';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { UserRequestHandler } from '../types/RequestHandler';

const deleteUserById: UserRequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new ServerError('A user id was not provided.', 400);
    }
    if (!isValidUUID(userId)) {
      throw new ServerError('The given user id is invalid.', 400);
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: userId })
      .execute();

    const successResponse = new SuccessResponse('Deleted user.', 200, {});
    next(successResponse);
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      return;
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default deleteUserById;
