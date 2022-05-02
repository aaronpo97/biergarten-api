import bcrypt from 'bcrypt';
import ServerError from '../../../util/error/ServerError';
import User from '../../../database/model/User';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { LoginUserRequestHandler } from '../types/RequestHandler';

/**
 * Business logic for logging in a user. The request body should contain the username
 * and password. Will throw an error if the username and password is not provided, or
 * if the provided username or password is incorrect. If a user if found with the given
 * username, the server will use bcrypt.compare to compare the provided password and the
 * hashed password in the database.
 */
const loginUser: LoginUserRequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      throw new ServerError('Username and/or password was not provided.', 400);
    }

    const userToLogin = await User.findOne({ where: { username } });

    if (!userToLogin) {
      throw new ServerError('Username or password was incorrect', 400);
    }

    const { hash } = userToLogin;

    const isValidPassword = await bcrypt.compare(password, hash);

    if (!isValidPassword) {
      throw new ServerError('Username or password was incorrect', 400);
    }

    const successResponse = new SuccessResponse('Successfully logged in.', 200, {});
    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(new ServerError('Something went wrong', 500));
  }
};

export default loginUser;
