import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PharmacyBookMark } from '@prisma/client';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async updateBookmark(
    userId: string,
    pharmacyId: number,
  ): Promise<PharmacyBookMark> {
    return await this.prisma.pharmacyBookMark.update({
      where: {
        user_id: ,
      },
      data: {
        pharmacy_id: pharmacyId,
      },
    });
  }
}
