import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { PharmacyBookMark } from '@prisma/client';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { BookmarkCreateDto } from './dto/bookmark.dto';
@ApiTags('Bookmark API')
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @ApiOperation({ summary: '북마크 생성' })
  @Post()
  @HttpCode(201)
  createBookmark(
    @Body() bookmarkCreateDto: BookmarkCreateDto,
  ): Promise<PharmacyBookMark> {
    return this.bookmarkService.createBookmark(
      bookmarkCreateDto.userId,
      bookmarkCreateDto.pharmacyId,
    );
  }
  @ApiOperation({ summary: '북마크 리스트 조회' })
  @Get('list')
  @HttpCode(200)
  listBookmark(): Promise<PharmacyBookMark[]> {
    return this.bookmarkService.listBookmark();
  }

  @ApiOperation({ summary: '북마크 개별 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '조회할 북마크 ID',
  })
  @Get(':id')
  @HttpCode(200)
  readBookmark(@Param('id') pharmcyId: number): Promise<PharmacyBookMark> {
    return this.bookmarkService.getBookmark(pharmcyId);
  }

  @ApiOperation({ summary: '북마크 삭제 ' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '삭제할 북마크 ID',
  })
  @Delete(':id')
  @HttpCode(204)
  deleteBookmark(@Param('id') pharmacyId: number): Promise<void> {
    return this.bookmarkService.deleteBookmark(pharmacyId);
  }
}
