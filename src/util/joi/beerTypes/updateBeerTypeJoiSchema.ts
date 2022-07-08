import Joi from 'joi';

const updateBeerTypeJoiSchema = Joi.object({
  descriptionUpdate: Joi.string(),
  nameUpdate: Joi.string(),
});

export default updateBeerTypeJoiSchema;
