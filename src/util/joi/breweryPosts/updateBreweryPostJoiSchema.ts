import Joi from 'joi';

const updateBreweryPostJoiSchema = Joi.object({
  name: Joi.string().max(100),
  description: Joi.string().max(500),
  location: Joi.string().max(250),
  phoneNumber: Joi.string(),
});

export default updateBreweryPostJoiSchema;
