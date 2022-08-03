import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BookmarkCreateResponseDto,
  BookmarkListResponseDto,
} from './dto/bookmark.dto';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(
    pharmacyId: number,
    userId: string,
  ): Promise<BookmarkCreateResponseDto> {
    const bookmark = await this.getPharmacyBookmark(userId, pharmacyId);
    console.log(bookmark);
    if (bookmark) {
      throw new ForbiddenException(
        `ID : ${pharmacyId} 인 약국은 이미 북마크에 존재합니다.`,
      );
    }
    return await this.prisma.pharmacyBookMark.create({
      data: {
        user_id: userId,
        pharmacy_id: pharmacyId,
      },
      select: {
        id: true,
        pharmacy_id: true,
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

  async listBookmark(userId: string): Promise<BookmarkListResponseDto[]> {
    return await this.prisma.pharmacyBookMark.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        Pharmacy: true,
      },
    });
  }

  async getBookmark(
    id: number,
    userId: string,
  ): Promise<BookmarkListResponseDto> {
    return await this.prisma.pharmacyBookMark.findFirst({
      where: {
        user_id: userId,
        id,
      },
      select: {
        id: true,
        Pharmacy: true,
      },
    });
  }

  async getPharmacyBookmark(
    userId: string,
    pharmacyId: number,
  ): Promise<BookmarkListResponseDto> {
    return await this.prisma.pharmacyBookMark.findFirst({
      where: {
        user_id: userId,
        pharmacy_id: pharmacyId,
      },
      select: {
        id: true,
        Pharmacy: true,
      },
    });
  }
}
