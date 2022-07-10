import { createValidator } from 'express-joi-validation';

/** An express request validator that validates incoming requests against a JOI schema. */
const requestValidator = createValidator({ passError: true });

export default requestValidator;
