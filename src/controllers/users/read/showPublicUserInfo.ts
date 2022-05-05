import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { UserRequestHandler } from '../types/RequestHandler';

const showPublicUserInfo: UserRequestHandler = async (req, res, next) => {
  try {
    /** @todo Join the user table with its associated beer posts */
    const { userId } = req.params;
    const queriedUser = await User.findOne({
      where: { id: userId },
      select: ['username', 'dateOfBirth', 'joinedDate'],
    });

    if (!queriedUser) {
      throw new ServerError('Could not find a user with that id.', 404);
    }

    const successResponse = new SuccessResponse(
      `Sending the user with id: ${userId}`,
      200,
      queriedUser,
    );

    next(successResponse);
  } catch (e) {
    next(e);
  }
};

export default showPublicUserInfo;
