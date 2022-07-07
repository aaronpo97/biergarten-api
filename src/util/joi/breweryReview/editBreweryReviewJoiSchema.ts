import Joi from 'joi';

const editBreweryReviewJoiSchema = Joi.object({
  reviewBody: Joi.string().min(1).max(400),
  rating: Joi.number().min(1).max(5),
});

export default editBreweryReviewJoiSchema;
