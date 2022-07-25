import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PharmacyBookMark } from '@prisma/client';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(
    userId: string,
    pharmacyId: number,
  ): Promise<PharmacyBookMark> {
    return this.prisma.pharmacyBookMark.create({
      data: {
        user_id: userId,
        pharmacy_id: pharmacyId,
      },
    });
  }
  async deleteBookmark(id: number): Promise<PharmacyBookMark> {
    return this.prisma.pharmacyBookMark.delete({
      where: {
        id: id,
      },
    });
  }
}
