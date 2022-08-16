import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BookmarkCreateResponse,
  BookmarkGetResponse,
  BookmarkListResponse,
} from './interface/bookmark.interface';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(
    pharmacyId: number,
    userId: string,
  ): Promise<BookmarkCreateResponse> {
    const { bookmark } = await this.getPharmacyBookmark(userId, pharmacyId);
    if (bookmark) {
      throw new ForbiddenException(
        `ID : ${pharmacyId} 인 약국은 이미 북마크에 존재합니다.`,
      );
    }
    const createMark = await this.prisma.pharmacyBookMark.create({
      data: {
        user_id: userId,
        pharmacy_id: pharmacyId,
      },
      select: {
        id: true,
        pharmacy_id: true,
      },
    });
    const body = {
      statusCode: 200,
      message: '북마크 생성 완료',
      bookmark: createMark,
    };
    return body;
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

  async listBookmark(userId: string): Promise<BookmarkListResponse> {
    const bookmark = await this.prisma.pharmacyBookMark.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        Pharmacy: true,
      },
    });
    const body = {
      statusCode: 200,
      message: '리스트 조회 성공',
      bookmark,
    };
    return body;
  }

  async getBookmark(id: number, userId: string): Promise<BookmarkGetResponse> {
    const bookmark = await this.prisma.pharmacyBookMark.findFirst({
      where: {
        user_id: userId,
        id,
      },
      select: {
        id: true,
        Pharmacy: true,
      },
    });
    const body = {
      statusCode: 200,
      message: '리스트 조회 성공',
      bookmark,
    };
    return body;
  }

  async getPharmacyBookmark(
    userId: string,
    pharmacyId: number,
  ): Promise<BookmarkGetResponse> {
    const bookmark = await this.prisma.pharmacyBookMark.findFirst({
      where: {
        user_id: userId,
        pharmacy_id: pharmacyId,
      },
      select: {
        id: true,
        Pharmacy: true,
      },
    });
    const body = {
      statusCode: 200,
      message: '리스트 조회 성공',
      bookmark,
    };
    return body;
  }
}
