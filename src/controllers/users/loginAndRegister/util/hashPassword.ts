import bcrypt from 'bcrypt';
import { hashPasswordFn } from '../../types/UtilTypes';

/**
 * @description
 * Basic helper function that will hash a password. Generates a random password salt
 * and creates a password hash using the hash method from the bcrypt library.
 *
 * Returns the password hash.
 *
 */
const hashPassword: hashPasswordFn = async (password) => {
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export default hashPassword;
