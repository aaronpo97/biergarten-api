import Joi from 'joi';

const createBeerPostJoiSchema = Joi.object({
  name: Joi.string().required().max(40),
  description: Joi.string().required().max(500),
  typeId: Joi.string().uuid().required(),
  abv: Joi.number().min(0).max(50).required(),
  ibu: Joi.number().min(0).max(120).required(),
  breweryId: Joi.string().uuid().required(),
});

export default createBeerPostJoiSchema;
