import Joi from 'joi';

const updateBeerCommentValidationSchema = Joi.object({
  commentEditBody: Joi.string().min(1).max(350),
});
export default updateBeerCommentValidationSchema;
