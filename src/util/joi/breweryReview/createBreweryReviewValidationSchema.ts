import Joi from 'joi';

const createBreweryReviewValidationSchema = Joi.object({
  reviewBody: Joi.string().min(1).max(400).required(),
  rating: Joi.string().min(1).max(5).required(),
});

export default createBreweryReviewValidationSchema;
