import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pharmacy } from '@prisma/client';
@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}
  async pharmacyList(): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({});
  }

  async pharmacySearchName(name: string, start?: number): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: start ? start : 0,
      take: 5,
    });
  }

  async pharmacySearchPhone(
    phone: string,
    start?: number,
  ): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({
      where: {
        phone: {
          contains: phone,
        },
      },
      skip: start ? start : 0,
      take: 5,
    });
  }

  async pharmacySearchAddress(
    address: string,
    start?: number,
  ): Promise<Pharmacy[]> {
    return await this.prisma.pharmacy.findMany({
      where: {
        address: {
          contains: address,
        },
      },
      take: 5,
      skip: start ? start : 0,
    });
  }

  async pharmacyCountAddress(address: string): Promise<number> {
    return await this.prisma.pharmacy.count({
      where: {
        address: {
          contains: address,
        },
      },
    });
  }

  async pharmacyCountName(name: string): Promise<number> {
    return await this.prisma.pharmacy.count({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
  async pharmacyCountPhone(phone: string): Promise<number> {
    return await this.prisma.pharmacy.count({
      where: {
        phone: {
          contains: phone,
        },
      },
    });
  }
}
