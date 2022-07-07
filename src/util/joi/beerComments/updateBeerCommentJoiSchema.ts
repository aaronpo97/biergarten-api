import Joi from 'joi';

const updateBeerCommentJoiSchema = Joi.object({
  commentEditBody: Joi.string().min(1).max(350),
});
export default updateBeerCommentJoiSchema;
