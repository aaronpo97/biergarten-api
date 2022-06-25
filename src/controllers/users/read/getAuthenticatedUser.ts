import { RequestHandler } from 'express-serve-static-core';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const { currentUser } = req;
    if (!currentUser) {
      throw new ServerError('Something went wrong.', 400);
    }
    const successResponse = new SuccessResponse(
      'Sending the currently authenticated user.',
      200,
      currentUser,
    );

    next(successResponse);
  } catch (err) {
    next(err);
  }
};
export default getAuthenticatedUser;
