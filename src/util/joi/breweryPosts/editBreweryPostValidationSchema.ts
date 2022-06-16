import Joi from 'joi';

const editBreweryPostValidationSchema = Joi.object({
  name: Joi.string().max(100),
  description: Joi.string().max(500),
  location: Joi.string().max(250),
});

export default editBreweryPostValidationSchema;
