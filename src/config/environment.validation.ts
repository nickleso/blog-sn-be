import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('dev', 'prod', 'test', 'provision')
    .default('dev'),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
});
