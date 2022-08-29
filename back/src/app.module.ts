import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import AdminJS from 'adminjs';
import { AlarmsModule } from './alarms/alarms.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { FcmModule } from './fcm/fcm.module';
import { GcsModule } from './gcs/gcs.module';
import { MailModule } from './mail/mail.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { PillModule } from './pill/pill.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';
import { UsersModule } from './users/users.module';
import { postgresResourceArr, validation } from './utils';
import config from './utils/config';

AdminJS.registerAdapter({ Database, Resource });

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
    AlarmsModule,
    FcmModule,
    UsersModule,
    GcsModule,
    PillModule,
    AdminModule.createAdminAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: postgresResourceArr,
          },
          auth: {
            authenticate: async (email, password) => {
              if (
                configService.get('ADMIN_PASSWORD') === password &&
                configService.get('ADMIN_EMAIL') === email
              ) {
                return {
                  email: configService.get('ADMIN_EMAIL'),
                  password: configService.get('ADMIN_PASSWORD'),
                };
              }
              return null;
            },
            cookieName: 'adminBro',
            cookiePassword: 'some-secret-password-used-to-secure-cookie',
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [ThrottlerModule],
})
export class AppModule {}
