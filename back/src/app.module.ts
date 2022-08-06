import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';
import { MailModule } from './mail/mail.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    HttpModule,
    MailModule,
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    RedisModule,
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').required(),
        DATABASE_URL: Joi.string().required(),
        SERVER_PORT: Joi.number().required(),
        CLIENT_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRESIN: Joi.number().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRESIN_AUTOSAVE: Joi.number().required(),
        JWT_REFRESH_EXPIRESIN: Joi.number().required(),
        REFRESHTOKEN_KEY: Joi.string().required(),
        RECAPTCHA_V2_SECRETKEY: Joi.string().required(),
        RECAPTCHA_V2_PUBLIC_URL: Joi.string().required(),
        ACCESS_KEY_ID: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
        MAIL_API_DOMAIN: Joi.string().required(),
        SENDER_ADDRESS: Joi.string().required(),
        CHANGE_PASSWORD_KEY: Joi.string().required(),
        PW_TOKEN_TTL: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        KAKAO_REST_API_KEY: Joi.string().required(),
        KAKAO_REDIRECT_URI: Joi.string().required(),
        KAKAO_SECRET_KEY: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_PASSWORD: Joi.string().required(),
        GOOGLE_REDIRECT: Joi.string().required(),
      }),
    }),
    BookmarkModule,
    PharmacyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [HttpModule, MailModule, ThrottlerModule, ConfigModule],
})
export class AppModule {}
