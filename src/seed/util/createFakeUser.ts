import User from '../../database/model/User';
import { hashPassword } from '../../util/auth/passwordFns';
import { IRawFakeUserData } from '../data/types';

const createFakeUser = async (rawUserData: IRawFakeUserData) => {
  const { username, email, dateOfBirth } = rawUserData;
  const fakeUser = new User();

  fakeUser.username = username;
  fakeUser.email = email;
  fakeUser.dateOfBirth = dateOfBirth;
  fakeUser.joinedDate = new Date(Date.now());
  fakeUser.accountConfirmed = true;
  fakeUser.hash = await hashPassword('password');

  await fakeUser.save();
  return fakeUser;
};

export default createFakeUser;
