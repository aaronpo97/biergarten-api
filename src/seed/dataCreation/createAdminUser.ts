import User from '../../database/model/User';
import { hashPassword } from '../../util/auth/passwordFns';

/** Helper function to create an admin user for interaction with the API. */
const createAdminUser = async () => {
  const adminUser = new User();

  adminUser.email = 'admin@example.com';
  adminUser.dateOfBirth = '01/01/2000';
  adminUser.joinedDate = new Date(Date.now());
  adminUser.username = 'admin';
  adminUser.accountConfirmed = true;
  adminUser.hash = await hashPassword('password');
  adminUser.firstName = 'Jane';
  adminUser.lastName = 'Doe';

  return adminUser.save();
};

export default createAdminUser;
