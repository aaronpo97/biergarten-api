import { generateConfirmationToken } from '../../../util/auth/generateTokens';
import AppDataSource from '../../../database/AppDataSource';
import User from '../../../database/model/User';
import { checkIfUserExists } from '../../../util/auth/checkUserFns';
import { hashPassword } from '../../../util/auth/passwordFns';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { RegisterUserRequestHandler } from '../types/RequestHandlers';
import sendConfirmationEmail from '../../../util/userRegistration/sendConfirmationEmail';

/**
 * Business logic for registering a user.
 *
 * Will throw an error if it is not the case that the username, email, date of birth, and
 * password are provided. Performs a check to see if whether or not the user exists, and
 * will throw an error if true. Invokes a function to hash the given password with its
 * returned value (i.e. the hashed password) being stored in the database.
 */

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
        400,
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

    const successResponse = new SuccessResponse<{
      registeredUser: User;
      confirmationToken: string;
    }>('Successfully registered user.', 201, {
      registeredUser: userToRegister,
      confirmationToken,
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
