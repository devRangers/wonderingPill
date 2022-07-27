import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter.filter';
import { PharmacyService } from './pharmacy/pharmacy.service';
import { PharmacyController } from './pharmacy/pharmacy.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { AccessGuard } from './common/guards';

@Module({
  imports: [HttpModule, AuthModule, PrismaModule],
  controllers: [AppController, PharmacyController],
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
