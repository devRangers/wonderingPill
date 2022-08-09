import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PharmacyCountResponse,
  PharmacyListResponse,
} from './interface/pharmacy.interface';
@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}
  async pharmacyList(): Promise<PharmacyListResponse> {
    const pharmacy = await this.prisma.pharmacy.findMany({
      include: {
        PharmacyBookMark: true,
      },
    });
    const body = {
      statusCode: 200,
      message: '약국 리스트 조회 성공',
      pharmacy,
    };
    return body;
  }

  async pharmacySearchName(
    name: string,
    start?: number,
  ): Promise<PharmacyListResponse> {
    const pharmacy = await this.prisma.pharmacy.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: start ? start : 0,
      take: 5,
    });
    const body = {
      statusCode: 200,
      message: '약국 리스트 조회 성공',
      pharmacy,
    };
    return body;
  }

  async pharmacySearchPhone(
    phone: string,
    start?: number,
  ): Promise<PharmacyListResponse> {
    const pharmacy = await this.prisma.pharmacy.findMany({
      where: {
        phone: {
          contains: phone,
        },
      },
      skip: start ? start : 0,
      take: 5,
    });
    const body = {
      statusCode: 200,
      message: '약국 리스트 조회 성공',
      pharmacy,
    };
    return body;
  }

  async pharmacySearchAddress(
    address: string,
    start?: number,
  ): Promise<PharmacyListResponse> {
    const pharmacy = await this.prisma.pharmacy.findMany({
      where: {
        address: {
          contains: address,
        },
      },
      take: 5,
      skip: start ? start : 0,
    });
    const body = {
      statusCode: 200,
      message: '약국 리스트 조회 성공',
      pharmacy,
    };
    return body;
  }

  async pharmacyCountAddress(address: string): Promise<PharmacyCountResponse> {
    const count = await this.prisma.pharmacy.count({
      where: {
        address: {
          contains: address,
        },
      },
    });
    const body = {
      statusCode: 200,
      message: '약국 리스트 조회 성공',
      count,
    };
    return body;
  }

  async pharmacyCountName(name: string): Promise<PharmacyCountResponse> {
    const count = await this.prisma.pharmacy.count({
      where: {
        name: {
          contains: name,
        },
      },
    });
    const body = {
      statusCode: 200,
      message: '약국 리스트 조회 성공',
      count,
    };
    return body;
  }
  async pharmacyCountPhone(phone: string): Promise<PharmacyCountResponse> {
    const count = await this.prisma.pharmacy.count({
      where: {
        phone: {
          contains: phone,
        },
      },
    });
    const body = {
      statusCode: 200,
      message: '약국 리스트 조회 성공',
      count,
    };
    return body;
  }
}
