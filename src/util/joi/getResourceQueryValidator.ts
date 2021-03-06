import Joi from 'joi';

const getResourceQueryValidator = Joi.object({
  page_num: Joi.number(),
  page_size: Joi.number().max(100).min(1),
  paginated: Joi.boolean(),
});

export default getResourceQueryValidator;
