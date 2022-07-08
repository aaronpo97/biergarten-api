import User from '../../database/model/User';
import { hashPassword } from '../../util/auth/passwordFns';
import { RawFakeUserData } from '../fakeDataGenerators/types';

/**
 * Helper function to create a fake user.
 * 
 * @param rawUserData An instance of RawFakeUserData to facilitate the creation of a fake user account.
 */
const createFakeUser = async (rawUserData: RawFakeUserData) => {
  const { username, email, dateOfBirth, firstName, lastName } = rawUserData;
  const fakeUser = new User();

  fakeUser.username = username;
  fakeUser.email = email;
  fakeUser.dateOfBirth = dateOfBirth;
  fakeUser.joinedDate = new Date(Date.now());
  fakeUser.accountConfirmed = true;
  fakeUser.hash = await hashPassword('password');
  fakeUser.firstName = firstName;
  fakeUser.lastName = lastName;

  return fakeUser.save();
};

export default createFakeUser;
