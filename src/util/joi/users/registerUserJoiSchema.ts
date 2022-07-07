import Joi from 'joi';

const registerUserJoiSchema = Joi.object({
  username: Joi.string().required().min(2),
  email: Joi.string().required().email(),
  dateOfBirth: Joi.string().required().isoDate(),
  password: Joi.string().required().min(8).max(32),
  firstName: Joi.string().required().min(2),
  lastName: Joi.string().required().min(1),
});

export default registerUserJoiSchema;
