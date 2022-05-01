import bcrypt from 'bcrypt';
import logger from '../../../../util/logger';

const hashPassword: (password: string) => Promise<{ hash: string; salt: string }> = async (password) => {
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);

  logger.info({ salt, hash });

  return { salt, hash };
};

export default hashPassword;
