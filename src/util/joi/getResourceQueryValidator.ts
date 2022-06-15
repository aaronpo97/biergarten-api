import Joi from 'joi';

const getResourceQueryValidator = Joi.object({
  page_num: Joi.string().regex(/^\d+$/),
  page_size: Joi.string().regex(/^\d+$/),
});

export default getResourceQueryValidator;
