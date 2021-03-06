import Joi from 'joi';

const loginUserJoiSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(8).required(),
});

export default loginUserJoiSchema;
