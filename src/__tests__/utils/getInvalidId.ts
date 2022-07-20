import crypto from 'crypto';

const getInvalidId = () => crypto.randomBytes(12).toString('hex');

export default getInvalidId;
