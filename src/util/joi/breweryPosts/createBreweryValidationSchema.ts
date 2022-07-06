import Joi from 'joi';

const createBreweryValidationSchema = Joi.object({
  name: Joi.string().required().max(100),
  description: Joi.string().required().max(500),
  location: Joi.string().required().max(250),
  phoneNumber: Joi.string().required(),
});

export default createBreweryValidationSchema;
