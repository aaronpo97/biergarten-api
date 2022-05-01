import User from '../../../database/model/User';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { UserRequestHandler } from '../types/RequestHandler';

const showPublicUserInfo: UserRequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const queriedUser = await User.findOne({
      where: { id: userId },
      select: ['username', 'beerPosts', 'dateOfBirth', 'joinedDate'],
    });

    const successResponse = new SuccessResponse(`Sending the user with id: ${userId}`, 200, queriedUser);

    next(successResponse);
  } catch (e) {
    next(e);
  }
};

export default showPublicUserInfo;
