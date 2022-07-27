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
  async deleteBookmark(id: number): Promise<void> {
    const bookmark = await this.getBookmark(id);
    if (!bookmark) {
      throw new ForbiddenException(`Bookmark with id ${id} not found`);
    }
    await this.prisma.pharmacyBookMark.delete({
      where: {
        id: id,
      },
    });
  }

  async listBookmark(): Promise<PharmacyBookMark[]> {
    return await this.prisma.pharmacyBookMark.findMany({
      where: {
        user_id: '7fdd64c5-0ef1-49ef-abdc-55f44e048aa5',
      },
      include: {
        Pharmacy: true,
      },
    });
  }

  async getBookmark(id: number): Promise<PharmacyBookMark> {
    return await this.prisma.pharmacyBookMark.findFirst({
      where: {
        user_id: '7fdd64c5-0ef1-49ef-abdc-55f44e048aa5',
        id,
      },
      include: {
        Pharmacy: true,
      },
    });
  }
}
