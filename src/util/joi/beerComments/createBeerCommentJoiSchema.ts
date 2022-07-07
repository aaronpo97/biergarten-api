import Joi from 'joi';

const createBeerCommentJoiSchema = Joi.object({
  comment: Joi.string().min(1).max(350).required(),
  rating: Joi.number().min(1).max(5).required(),
});

export default createBeerCommentJoiSchema;
