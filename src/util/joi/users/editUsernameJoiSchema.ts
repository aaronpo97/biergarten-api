import Joi from 'joi';

const editUsernameJoiSchema = Joi.object({
  username: Joi.string().min(2).max(20),
});

export default editUsernameJoiSchema;
