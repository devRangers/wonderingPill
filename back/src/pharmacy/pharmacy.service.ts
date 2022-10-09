import { Injectable, NotFoundException } from '@nestjs/common';
import { Pharmacy } from 'prisma/postgresClient';
import { PrismaService } from 'src/prisma/prisma.service';
import { PharmacySearchDto } from './dto/pharmacy.search.dto';
@Injectable()
export class PharmacyService {
  constructor(private readonly prisma: PrismaService) {}

  async pharmacySearch(
    pharmacySearchDto: PharmacySearchDto,
  ): Promise<Pharmacy[]> {
    const { option, keyword } = pharmacySearchDto;
    let pharmacies;
    try {
      if (option === 'address') {
        pharmacies = await this.prisma.pharmacy.findMany({
          where: {
            address: { contains: keyword },
          },
          take: 10,
        });
      } else if (option === 'name') {
        pharmacies = await this.prisma.pharmacy.findMany({
          where: { name: { contains: keyword } },
          take: 10,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('검색을 하지 못했습니다.');
    }
    if (pharmacies === []) {
      throw new NotFoundException('검색 결과가 존재하지 않습니다.');
    }
    return pharmacies;
  }
}
