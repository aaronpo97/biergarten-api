import Joi from 'joi';

const editUsernameValidationSchema = Joi.object({
  username: Joi.string().min(2).max(20),
});

export default editUsernameValidationSchema;
