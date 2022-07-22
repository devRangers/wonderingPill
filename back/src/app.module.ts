import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './pipes/HttpExceptionFilter.filter';
import { PharmacyService } from './pharmacy/pharmacy.service';
import { PharmacyController } from './pharmacy/pharmacy.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { HttpModule } from '@nestjs/axios';
import * as config from 'config';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    PrismaModule,
    RedisModule.forRoot({
      // useFactory: () => ({
      config: {
        url: `redis://${process.env.REDIS_HOST || config.get('redis').host}:${
          process.env.REDIS_PORT || config.get('redis').port
        }`,
        connectTimeout: 15000,
        family: 6,
        // retryStrategy: (times) => Math.min(times * 30, 1000),
        // reconnectOnError(error) {
        //   const targetErrors = [/READONLY/, /ETIMEDOUT/];
        //   return targetErrors.some((targetError) =>
        //     targetError.test(error.message),
        //   );
        // },
        lazyConnect: true,
      },
      // }),
    }),
  ],
  controllers: [AppController, PharmacyController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    PharmacyService,
    PrismaService,
  ],
  exports: [HttpModule, RedisModule],
})
export class AppModule {}
