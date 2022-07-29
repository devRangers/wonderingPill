import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PharmacyBookMark } from '@prisma/client';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(
    userId: string,
    pharmacyId: number,
  ): Promise<PharmacyBookMark> {
    return await this.prisma.pharmacyBookMark.create({
      data: {
        user_id: userId,
        pharmacy_id: pharmacyId,
      },
    });
  }
  async deleteBookmark(id: number, userId: string): Promise<void> {
    const bookmark = await this.getBookmark(id, userId);
    if (!bookmark) {
      throw new ForbiddenException(`Bookmark with id ${id} not found`);
    }
    await this.prisma.pharmacyBookMark.delete({
      where: {
        id: id,
      },
    });
  }

  async listBookmark(userId: string): Promise<PharmacyBookMark[]> {
    return await this.prisma.pharmacyBookMark.findMany({
      where: {
        user_id: userId,
      },
      include: {
        Pharmacy: true,
      },
    });
  }

  async getBookmark(id: number, userId: string): Promise<PharmacyBookMark> {
    return await this.prisma.pharmacyBookMark.findFirst({
      where: {
        user_id: userId,
        id,
      },
      include: {
        Pharmacy: true,
      },
    });
  }
}
