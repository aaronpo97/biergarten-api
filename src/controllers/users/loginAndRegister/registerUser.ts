import {
  generateAccessToken,
  generateRefreshToken,
  generateConfirmationToken,
} from '../../../util/auth/generateTokens';
import AppDataSource from '../../../database/AppDataSource';
import User from '../../../database/model/User';
import { checkIfUserExists } from '../../../util/auth/checkUserFns';
import { hashPassword } from '../../../util/auth/passwordFns';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { RegisterUserRequestHandler } from '../types/RequestHandlers';
import sendConfirmationEmail from '../../../util/userRegistration/sendConfirmationEmail';
import inProductionMode from '../../../util/environment/inProductionMode';

/** Business logic for registering a user. */
const registerUser: RegisterUserRequestHandler = async (req, res, next) => {
  try {
    const { username, email, dateOfBirth, password } = req.body;

    if (!(username && email && dateOfBirth && password)) {
      throw new ServerError('Missing parameters.', 400);
    }

    const userExists = await checkIfUserExists(username, email);

    if (userExists) {
      throw new ServerError(
        'A user with the given username or email is already registered.',
        409,
      );
    }

    const userToRegister = new User();

    const hash = await hashPassword(password);

    userToRegister.username = username;
    userToRegister.email = email;
    userToRegister.dateOfBirth = dateOfBirth;
    userToRegister.joinedDate = new Date(Date.now());
    userToRegister.hash = hash;
    userToRegister.accountConfirmed = false;

    await AppDataSource.manager.save(userToRegister);

    const confirmationToken = await generateConfirmationToken(userToRegister);
    const refreshToken = await generateRefreshToken(userToRegister);
    const accessToken = await generateAccessToken(refreshToken);

    const successResponse = new SuccessResponse('Successfully registered user.', 201, {
      user: { id: userToRegister.id, username: userToRegister.username },
      refreshToken,
      accessToken,
      confirmationToken: !inProductionMode ? confirmationToken : undefined,
    });

    await sendConfirmationEmail(confirmationToken, userToRegister);

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }

    next(new ServerError('Something went wrong', 500));
  }
};
export default registerUser;
