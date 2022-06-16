import Joi from 'joi';

const registerUserValidationSchema = Joi.object({
  username: Joi.string().required().min(2),
  email: Joi.string().required().email(),
  dateOfBirth: Joi.string().required().isoDate(),
  /**
   * @todo Password must have:
   *
   *                          At least one digit [0-9]
   *        At least one lowercase character [a-z]
   *        At least one uppercase character [A-Z]
   *        At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|]
   *        At least 8 characters in length, but no more than 32.
   */
  password: Joi.string().required().min(8).max(32),
});

export default registerUserValidationSchema;
