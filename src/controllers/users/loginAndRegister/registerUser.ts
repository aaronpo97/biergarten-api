import { RequestHandler, ParamsDictionary } from 'express-serve-static-core';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import checkIfUserExists from './util/checkIfUserExists';
import hashPassword from './util/hashPassword';

import { RegisterUserRequestHandler } from '../types/RequestHandler';

const registerUser: RegisterUserRequestHandler = async (req, res, next) => {
  try {
    const { username, email, dateOfBirth, password } = req.body;

    if (!(username && email && dateOfBirth && password)) {
      throw new ServerError('Missing parameters.', 400);
    }

    const userExists = await checkIfUserExists(username, email);

    if (userExists) {
      throw new ServerError('A user with the given username or email is already registered.', 400);
    }

    const userToRegister = new User();

    const { hash, salt } = await hashPassword(password);

    userToRegister.username = username;
    userToRegister.email = email;
    userToRegister.dateOfBirth = dateOfBirth;
    userToRegister.joinedDate = new Date(Date.now());

    userToRegister.passwordHash = hash;
    userToRegister.passwordSalt = salt;

    await userToRegister.save();

    const successResponse = new SuccessResponse('Successfully registered user.', 201, userToRegister);

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
