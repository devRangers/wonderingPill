import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './pipes/HttpExceptionFilter.filter';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
