import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pharmacy, Prisma } from '@prisma/client';
@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}
  async pharmacyList(): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({});
  }

  async pharmacySearchName(
    name: string,
    pharmacy?: number,
  ): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      take: 4,
      skip: pharmacy ? 1 : 0,
      ...(pharmacy && { cursor: { id: pharmacy } }),
    });
  }

  async pharmacySearchPhone(
    phone: string,
    pharmacy?: number,
  ): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({
      where: {
        phone: {
          contains: phone,
        },
      },
      take: 4,
      skip: pharmacy ? 1 : 0,
      ...(pharmacy && { cursor: { id: pharmacy } }),
    });
  }

  async pharmacySearchAddress(
    address: string,
    pharmacy?: number,
  ): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({
      where: {
        address: {
          contains: address,
        },
      },
      take: 4,
      skip: pharmacy ? 1 : 0,
      ...(pharmacy && { cursor: { id: pharmacy } }),
    });
  }
}
