import { RequestHandler } from 'express-serve-static-core';

import { generateConfirmationToken } from '../../../util/auth/generateTokens';

import SuccessResponse from '../../../util/response/SuccessResponse';
import sendConfirmationEmail from '../../../util/userRegistration/sendConfirmationEmail';

import ServerError from '../../../util/error/ServerError';

const resendConfirmationEmail: RequestHandler = async (req, res, next) => {
  try {
    const { currentUser } = req;
    if (!currentUser) {
      throw new ServerError('Please reauthenticate your request.', 401);
    }

    const confirmationToken = await generateConfirmationToken(currentUser);

    await sendConfirmationEmail(confirmationToken, currentUser);

    const response = new SuccessResponse(
      'Resent your confirmation email.',
      200,
      undefined,
    );
    next(response);
  } catch (error) {
    next(error);
  }
};
export default resendConfirmationEmail;
