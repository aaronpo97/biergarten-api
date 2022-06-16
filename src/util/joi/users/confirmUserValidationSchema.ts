import Joi from 'joi';

const confirmUserValidationSchema = Joi.object({
  /** @todo Create a regular expression to check for a valid json web token. */
  confirmationToken: Joi.string().required(),
});

export default confirmUserValidationSchema;
