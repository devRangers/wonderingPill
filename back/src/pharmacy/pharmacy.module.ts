import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';

@Module({
  controllers: [PharmacyController],
  providers: [PharmacyService, PrismaService],
})
export class PharmacyModule {}
