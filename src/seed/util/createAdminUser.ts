import User from '../../database/model/User';
import { hashPassword } from '../../util/auth/passwordFns';

const createAdminUser = async () => {
  const adminUser = new User();

  adminUser.email = 'admin@example.com';
  adminUser.dateOfBirth = '01/01/2000';
  adminUser.joinedDate = new Date(Date.now());
  adminUser.username = 'admin';
  adminUser.hash = await hashPassword('password');
  await adminUser.save();

  return adminUser;
};

export default createAdminUser;
