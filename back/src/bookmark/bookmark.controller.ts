import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { PharmacyBookMark } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
import { BookmarkCreateDto } from './bookmark.dto';
@ApiTags('Bookmark API')
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @ApiOperation({ summary: '북마크 생성' })
  @Post()
  createBookmark(
    @Body() bookmarkCreateDto: BookmarkCreateDto,
  ): Promise<PharmacyBookMark> {
    return this.bookmarkService.createBookmark(
      bookmarkCreateDto.userId,
      bookmarkCreateDto.pharmacyId,
    );
  }
  @ApiOperation({ summary: '북마크 삭제 ' })
  @Delete()
  deleteBookmark(@Param('id') pharmacyId: number): Promise<PharmacyBookMark> {
    return this.bookmarkService.deleteBookmark(pharmacyId);
  }
}
