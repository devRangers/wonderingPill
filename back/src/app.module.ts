import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
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
      // validationSchema: Joi.object({
      // NODE_ENV: Joi.string().valid('development', 'production').required(),
      // DATABASE_URL: Joi.string().required(),
      // SERVER_PORT: Joi.number().required(),
      //   CLIENT_URL: Joi.string().required(),
      // }),
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
  exports: [HttpModule, MailModule, ThrottlerModule],
})
export class AppModule {}
