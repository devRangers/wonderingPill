import * as Joi from 'joi';

export const validation: Joi.Schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(), // SERVER SETTING & DB
  DATABASE_URL: Joi.string().required(),
  DATABASE_URL_MONGO: Joi.string().required(),
  SERVER_PORT: Joi.number().required(),
  CLIENT_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(), // JWT
  JWT_EXPIRESIN: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRESIN_AUTOSAVE: Joi.number().required(),
  JWT_REFRESH_EXPIRESIN: Joi.number().required(),
  REFRESHTOKEN_KEY: Joi.string().required(),
  RECAPTCHA_V2_SECRETKEY: Joi.string().required(), // RECAPTCHA
  RECAPTCHA_V2_PUBLIC_URL: Joi.string().required(),
  ACCESS_KEY_ID: Joi.string().required(), // MAIL SENDER
  SECRET_KEY: Joi.string().required(),
  MAIL_API_DOMAIN: Joi.string().required(),
  SENDER_ADDRESS: Joi.string().required(),
  CHANGE_PASSWORD_KEY: Joi.string().required(),
  PW_TOKEN_TTL: Joi.number().required(),
  REDIS_HOST: Joi.string().required(), // REDIS
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(), // GOOGLE LOGIN
  GOOGLE_CLIENT_PASSWORD: Joi.string().required(),
  GOOGLE_REDIRECT: Joi.string().required(),
  SMS_SERVICE_ID: Joi.string().required(), // SMS SENDER
  SMS_DOMAIN: Joi.string().required(),
  SENDER_PHONE: Joi.string().required(),
  GCS_KEY_FILE: Joi.string().required(), // GCS
  FIREBASE_KEY_FILE: Joi.string().required(), // FIREBASE
  PILL_DOMAIN: Joi.string().required(), // PILL API
  PILL_KEY: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().required(), // ADMIN BRO
  ADMIN_PASSWORD: Joi.string().required(),
}).options({
  abortEarly: true,
});
