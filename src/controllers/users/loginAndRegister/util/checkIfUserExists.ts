import User from '../../../../database/model/User';

const checkIfUserExists: (username: string, email: string) => Promise<boolean> = async (
  username,
  email,
) => {
  const userToLocate = await User.findOne({ where: [{ username }, { email }] });
  return !!userToLocate;
};

export default checkIfUserExists;
