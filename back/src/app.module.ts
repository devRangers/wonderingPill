import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';
import { AccessGuard } from './common/guards';
import { PharmacyController } from './pharmacy/pharmacy.controller';
import { PharmacyService } from './pharmacy/pharmacy.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [HttpModule, AuthModule, PrismaModule],
  controllers: [PharmacyController],
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
  ],
  exports: [HttpModule],
})
export class AppModule {}
