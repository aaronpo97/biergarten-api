import { userExistsCheckFn, UsernameTakenCheckFn } from './types';
import User from '../../database/model/User';

/**
 * Helper function for checking whether or not a user with the client provided username
 * and email already exists in the database.
 */
export const checkIfUserExists: userExistsCheckFn = async (username, email) => {
  const userToLocate = await User.findOne({ where: [{ username }, { email }] });
  const userExists = !!userToLocate;

  return userExists;
};

/**
 * Helper function for checking whether or not a user with the given username already
 * exists in the database.
 */
export const checkIfUsernameTaken: UsernameTakenCheckFn = async (username) => {
  const userToLocate = await User.findOne({ where: { username } });
  const userExists = !!userToLocate;

  return userExists;
};
