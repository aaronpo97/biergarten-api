import User from '../../../database/model/User';
import { verifyConfirmationToken } from '../../../util/auth/verifyTokenHelperFns';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { confirmUserFn } from '../types/RequestHandlers';

/**
 * Business logic for confirming a user.
 *
 * The current user object will be appended to the request object as a property. If the
 * user is already confirmed, the server will not proceed with the request and will throw
 * an error saying that the user is already confirmed.
 *
 * The confirmation token will be expected in the request body, which will be verified by
 * the server. If the token is valid/verified, the isConfirmed property on the current
 * user will be set from false to true.
 */

const confirmUser: confirmUserFn = async (req, res, next) => {
  try {
    const { confirmationToken } = req.body;

    if (!confirmationToken) {
      throw new ServerError(
        'A confirmation token was not provided in the request body.',
        500,
      );
    }

    const currentUser = req.currentUser as User;

    if (currentUser.accountConfirmed) {
      throw new ServerError('Your account is already confirmed.', 400);
    }

    await verifyConfirmationToken(confirmationToken);

    currentUser.accountConfirmed = true;
    await currentUser.save();

    const successResponse = new SuccessResponse(
      'Successfully confirmed user.',
      200,
      currentUser,
    );
    next(successResponse);
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }

    next(new ServerError('Something went wrong', 500));
  }
};

export default confirmUser;
