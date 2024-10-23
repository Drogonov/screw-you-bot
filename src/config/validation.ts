import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'example',
  ).default('development'),
  PORT: Joi.number(),
  DATABASE_URL: Joi.string(),
  JWT_SECRET: Joi.string(),
  TELEGRAM_BOT_TOKEN: Joi.string(),
  TOKEN: Joi.string()
});