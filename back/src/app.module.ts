import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';
import { PharmacyController } from './pharmacy/pharmacy.controller';
import { PharmacyService } from './pharmacy/pharmacy.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, PrismaModule, HttpModule],
  controllers: [PharmacyController, BookmarkController],

  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    PharmacyService,
    PrismaService,
    BookmarkService,
  ],
  exports: [HttpModule],
})
export class AppModule {}
