import { Injectable, NotFoundException } from '@nestjs/common';
import { PharmacyBookMark } from 'prisma/postgresClient';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  pharmacyBookmarkListResponse,
  PharmacySearchDto,
  PharmacySearchResponse,
} from './dto/pharmacy.search.dto';
@Injectable()
export class PharmacyService {
  constructor(private readonly prisma: PrismaService) {}

  async pharmacySearch(
    pharmacySearchDto: PharmacySearchDto,
  ): Promise<PharmacySearchResponse[]> {
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
          select: {
            id: true,
            name: true,
            phone: true,
            address: true,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
            holiday: true,
          },
          take: 10,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotFoundException('검색을 하지 못했습니다.');
    }
    return pharmacies;
  }

  async pharmacyBookmarkList(
    id: string,
  ): Promise<pharmacyBookmarkListResponse> {
    try {
      const pharmacyBookmarks: pharmacyBookmarkListResponse[] =
        await this.prisma.user.findMany({
          where: { id },
          select: { PharmacyBookMark: { select: { id: true } } },
        });
      const lists = pharmacyBookmarks[0];
      return lists;
    } catch (error) {
      throw new NotFoundException('북마크를 조회하지 못했습니다.');
    }
  }

  async pharmacyBookmark(id: string, pharmacyId: number) {
    const checkPharmacies: PharmacyBookMark[] = await this.checkBookmark(
      id,
      pharmacyId,
    );

    try {
      if (checkPharmacies.length === 0) {
        await this.prisma.pharmacyBookMark.create({
          data: { user_id: id, pharmacy_id: pharmacyId },
        });
      } else {
        await this.prisma.pharmacyBookMark.deleteMany({
          where: { user_id: id, pharmacy_id: pharmacyId },
        });
      }
    } catch (error) {
      throw new NotFoundException('북마크를 변경하지 못했습니다.');
    }
  }

  async checkBookmark(id, pharmacyId): Promise<PharmacyBookMark[]> {
    try {
      const checkPharmacies = await this.prisma.pharmacyBookMark.findMany({
        where: { user_id: id, pharmacy_id: pharmacyId },
      });

      return checkPharmacies;
    } catch (error) {
      throw new NotFoundException('북마크 상태를 조회하지 못했습니다.');
    }
  }
}
