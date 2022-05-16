import AppDataSource from '../../../database/AppDataSource';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { UserRequestHandler } from '../types/RequestHandlers';

/**
 * Business logic to delete a user by its id.
 *
 * Takes in the user id as a request parameter. Will throw an error if the user id is not
 * provided, or if the user id is an invalid UUID.
 */
const deleteUserById: UserRequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new ServerError('A user id was not provided.', 400);
    }
    if (!isValidUuid(userId)) {
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
