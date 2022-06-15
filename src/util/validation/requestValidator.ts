import { createValidator } from 'express-joi-validation';

const requestValidator = createValidator({ passError: true });

export default requestValidator;
