import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'example',
  ).default('development'),
  DATABASE_URL: Joi.string(),
  APP_PORT: Joi.number(),
  TELEGRAM_BOT_TOKEN: Joi.string()
});