import Joi from 'joi';

const confirmUserJoiSchema = Joi.object({
  /** @todo Create a regular expression to check for a valid json web token. */
  confirmationToken: Joi.string().required(),
});

export default confirmUserJoiSchema;
