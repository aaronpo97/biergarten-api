import { EmailTakenCheckFn, userExistsCheckFn, UsernameTakenCheckFn } from './types';
import User from '../../database/model/User';

/**
 * Helper function for checking whether or not a user with the client provided username
 * and email already exists in the database.
 *
 * @param username The username to be queried.
 * @param email The email address to be queried.
 * @returns {Promise<boolean>} A promise containing a boolean object representing whether
 *   or not a user with the provided username and email already exists.
 */
export const checkIfUserExists: userExistsCheckFn = async (username, email) => {
  const userToLocate = await User.findOne({ where: [{ username }, { email }] });
  const userExists = !!userToLocate;

  return userExists;
};

/**
 * Helper function for checking whether or not a user with the given username already
 * exists in the database.
 *
 * @param username The username to be queried.
 * @returns {Promise<boolean>} A promise containing a boolean object representing whether
 *   or not a user with the provided username already exists.
 */
export const checkIfUsernameTaken: UsernameTakenCheckFn = async (username) => {
  const userToLocate = await User.findOne({ where: { username } });
  const userExists = !!userToLocate;

  return userExists;
};

/**
 * Helper function for checking whether or not a user with the given email already exists
 * in the database.
 *
 * @param email The email address to be queried.
 * @returns {Promise<boolean>} A promise containing a boolean object representing whether
 *   or not a user with the provided email already exists.
 */
export const checkIfEmailTaken: EmailTakenCheckFn = async (email) => {
  const userToLocate = await User.findOne({ where: { email } });
  const userExists = !!userToLocate;

  return userExists;
};
