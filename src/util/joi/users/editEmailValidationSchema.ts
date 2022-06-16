import Joi from 'joi';

const editEmailValidationSchema = Joi.object({
  email: Joi.string().email(),
});

export default editEmailValidationSchema;
