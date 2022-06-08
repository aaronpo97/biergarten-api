import AppDataSource from '../../../database/AppDataSource';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import isValidUuid from '../../../util/validation/isValidUuid';
import { EditUsernameRequestHandler } from '../types/RequestHandlers';
import SuccessResponse from '../../../util/response/SuccessResponse';

const editUsername: EditUsernameRequestHandler = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { userId } = req.params;

    if (!username) {
      throw new ServerError(
        'An updated username was not provided with the request.',
        400,
      );
    }

    if (!isValidUuid(userId)) {
      throw new ServerError('The provided user id is invalid.', 400);
    }

    const usernameTaken = !!(await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getCount());

    if (usernameTaken) {
      throw new ServerError(
        'Unable to change your username as the provided updated username is already taken.',
        409,
      );
    }

    const updateQuery = await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ username })
      .where('id = :userId', { userId })
      .execute();

    const newAccessToken = req.newAccessToken as string | undefined;

    const response = new SuccessResponse(
      `Successfully updated the username for the user with id ${userId}`,
      200,
      updateQuery,
      newAccessToken,
    );

    next(response)
  } catch (err) {
    next(err);
  }
};

export default editUsername;
