import { RequestHandler } from 'express-serve-static-core';

import { generateConfirmationToken } from '../../../util/auth/generateTokens';

import SuccessResponse from '../../../util/response/SuccessResponse';
import sendConfirmationEmail from '../../../util/userRegistration/sendConfirmationEmail';
import User from '../../../database/model/User';

const resendConfirmationEmail: RequestHandler = async (req, res, next) => {
  try {
    const currentUser = req.currentUser as User;

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
