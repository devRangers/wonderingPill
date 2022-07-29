import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';
import { AccessGuard } from './common/guards';
import { PharmacyController } from './pharmacy/pharmacy.controller';
import { PharmacyService } from './pharmacy/pharmacy.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [AuthModule, PrismaModule, HttpModule],
  controllers: [PharmacyController, BookmarkController],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
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
