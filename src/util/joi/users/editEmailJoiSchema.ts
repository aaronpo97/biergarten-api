import Joi from 'joi';

const editEmailJoiSchema = Joi.object({
  email: Joi.string().email(),
});

export default editEmailJoiSchema;
