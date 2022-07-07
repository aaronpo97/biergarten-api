import Joi from 'joi';
import paginationQueryValidationSchema from '../paginationQueryValidationSchema';

const getAllBeerPostsQueryValidationSchema = Joi.object({
  ...paginationQueryValidationSchema,
  sort: Joi.string().valid('type', 'name', 'abv', 'ibu'),
});

export default getAllBeerPostsQueryValidationSchema;
