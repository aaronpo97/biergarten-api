import Joi from 'joi';

const getResourceQueryValidator = Joi.object({
  page_num: Joi.number(),
  page_size: Joi.number(),
  paginated: Joi.boolean(),
});

export default getResourceQueryValidator;
