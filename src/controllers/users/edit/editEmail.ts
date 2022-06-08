import { generateConfirmationToken } from '../../../util/auth/generateTokens';
import AppDataSource from '../../../database/AppDataSource';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import isValidUuid from '../../../util/validation/isValidUuid';
import { EditEmailRequestHandler } from '../types/RequestHandlers';
import SuccessResponse from '../../../util/response/SuccessResponse';
import sendConfirmationEmail from '../../../util/userRegistration/sendConfirmationEmail';

const editEmail: EditEmailRequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { userId } = req.params;

    if (!email) {
      throw new ServerError('An updated email was not provided with the request.', 400);
    }

    if (!isValidUuid(userId)) {
      throw new ServerError('The provided user id is invalid.', 400);
    }

    const usernameTaken = !!(await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getCount());

    if (usernameTaken) {
      throw new ServerError(
        'Unable to change your email as the provided updated email is already taken.',
        409,
      );
    }

    const newAccessToken = req.newAccessToken as string | undefined;

    const currentUser = req.currentUser as User;

    currentUser.email = email;
    currentUser.accountConfirmed = false;
    await currentUser.save();

    const confirmationToken = await generateConfirmationToken(currentUser);
    await sendConfirmationEmail(confirmationToken, currentUser);

    const response = new SuccessResponse(
      `Successfully updated the email for the user with id ${userId}. Please reconfirm your account.`,
      200,
      { currentUser, updated: true },
      newAccessToken,
    );

    next(response);
  } catch (err) {
    next(err);
  }
};

export default editEmail;
