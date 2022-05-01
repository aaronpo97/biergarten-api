import bcrypt from 'bcrypt';
import ServerError from '../../../util/error/ServerError';
import User from '../../../database/model/User';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { LoginUserRequestHandler } from '../types/RequestHandler';

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

    const { passwordHash } = userToLogin;

    const isValidPassword = await bcrypt.compare(password, passwordHash);

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
