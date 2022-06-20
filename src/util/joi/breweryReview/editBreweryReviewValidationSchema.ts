import Joi from 'joi';

const createBreweryReviewValidationSchema = Joi.object({
  reviewBody: Joi.string().min(1).max(400),
  rating: Joi.number().min(1).max(5),
});

export default createBreweryReviewValidationSchema;
