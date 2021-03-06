import Joi from 'joi';

const createBreweryReviewJoiSchema = Joi.object({
  reviewBody: Joi.string().min(1).max(400).required(),
  rating: Joi.number().min(1).max(5).required(),
});

export default createBreweryReviewJoiSchema;
