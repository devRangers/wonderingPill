import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import config from './config/config';
import { validation } from './config/validation';
import { MailModule } from './mail/mail.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.env',
      isGlobal: true,
      load: [config],
      validationSchema: validation,
    }),
    AuthModule,
    PrismaModule,
    HttpModule,
    MailModule,
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 30,
    }),
    RedisModule,
    BookmarkModule,
    PharmacyModule,
    SmsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [HttpModule, MailModule, SmsModule, ThrottlerModule, ConfigModule],
})
export class AppModule {}
