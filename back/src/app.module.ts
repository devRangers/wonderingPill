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
import { dmmf_postgres, prisma, validation } from './utils';
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
      imports: [PrismaModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: {
                  model: dmmf_postgres.modelMap.User,
                  client: prisma,
                },
                options: {},
              },
              {
                resource: {
                  model: dmmf_postgres.modelMap.Pill,
                  client: prisma,
                },
                options: {},
              },
              {
                resource: {
                  model: dmmf_postgres.modelMap.Inquiry,
                  client: prisma,
                },
                options: {},
              },
            ],
          },
        };
      },
    }),
  ],

  // {
  //   adminJsOptions: {
  //     rootPath: '/admin',
  //     resources: [
  //       {
  //         resource: { model: dmmf.modelMap.programs, client: prisma },
  //         options: {}
  //       }
  //     ]
  //   },

  // }
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [HttpModule, MailModule, SmsModule, ThrottlerModule, ConfigModule],
})
export class AppModule {}
