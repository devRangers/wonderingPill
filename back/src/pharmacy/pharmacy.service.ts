import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pharmacy, Prisma } from '@prisma/client';
@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}
  async pharmacyList(): Promise<Pharmacy[]> {
    return this.prisma.pharmacy.findMany({});
  }

  async pharmacySearchName(name: string): Promise<Pharmacy[]> {
    return this.prisma.pharmacy.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async pharmacySearchPhone(phone: string): Promise<Pharmacy[]> {
    return this.prisma.pharmacy.findMany({
      where: {
        phone: {
          contains: phone,
        },
      },
    });
  }

  async pharmacySearchAddress(address: string): Promise<Pharmacy[]> {
    return this.prisma.pharmacy.findMany({
      where: {
        address: {
          contains: address,
        },
      },
    });
  }
}
