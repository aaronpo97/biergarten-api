import User from '../../database/model/User';
import { hashPassword } from '../../util/auth/passwordFns';

/** Helper function to create an admin user for interaction with the API. */
const createExampleUser = async (username: string, password: string) => {
  const user = new User();

  user.email = `${username}@example.com`;
  user.dateOfBirth = '01/01/2000';
  user.joinedDate = new Date(Date.now());
  user.username = username;
  user.accountConfirmed = true;
  user.hash = await hashPassword(password);
  user.firstName = 'Jane';
  user.lastName = 'Doe';

  return user.save();
};

export default createExampleUser;
