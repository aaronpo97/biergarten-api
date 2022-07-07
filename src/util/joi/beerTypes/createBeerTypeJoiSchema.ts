import Joi from 'joi';

const createBeerTypeJoiSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
export default createBeerTypeJoiSchema;
