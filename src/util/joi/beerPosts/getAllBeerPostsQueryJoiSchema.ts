import Joi from 'joi';
import paginationQueryValidationSchema from '../paginationQueryValidationSchema';

const getAllBeerPostsQueryJoiSchema = Joi.object({
  ...paginationQueryValidationSchema,
  sort: Joi.string().valid('type', 'name', 'abv', 'ibu'),
});

export default getAllBeerPostsQueryJoiSchema;
