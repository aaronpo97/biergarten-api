import Joi from 'joi';

const createBeerTypeValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
export default createBeerTypeValidationSchema;
