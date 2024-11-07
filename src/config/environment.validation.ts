import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('dev', 'prod', 'test', 'provision')
    .default('dev'),
  MONGODB_URL: Joi.string().required(),
  PORT: Joi.number().required(),
});
