import Joi from 'joi';

const updateBeerPostJoiSchema = Joi.object({
  name: Joi.string().max(40).min(1),
  description: Joi.string().max(500).min(1),
  abv: Joi.number().min(0).max(50),
  ibu: Joi.number().min(0).max(120),
});

export default updateBeerPostJoiSchema;
