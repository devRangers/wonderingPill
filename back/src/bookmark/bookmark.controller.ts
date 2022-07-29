import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { PharmacyBookMark } from '@prisma/client';
import { ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { BookmarkCreateDto } from './dto/bookmark.dto';
import { AccessGuard, RefreshGuard } from 'src/common/guards';
import { GetCurrentUserId } from 'src/common/decorators';
@ApiTags('Bookmark API')
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @ApiOperation({ summary: '북마크 생성' })
  @Post()
  @UseGuards(RefreshGuard)
  @HttpCode(201)
  createBookmark(
    @GetCurrentUserId() userId: string,
    @Body() bookmarkCreateDto: BookmarkCreateDto,
  ): Promise<PharmacyBookMark> {
    return this.bookmarkService.createBookmark(
      userId,
      bookmarkCreateDto.pharmacyId,
    );
  }
  @ApiOperation({ summary: '북마크 리스트 조회' })
  @Get('list')
  @UseGuards(RefreshGuard)
  @HttpCode(200)
  listBookmark(@GetCurrentUserId() id: string): Promise<PharmacyBookMark[]> {
    return this.bookmarkService.listBookmark(id);
  }

  @ApiOperation({ summary: '북마크 개별 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '조회할 북마크 ID',
  })
  @Get(':id')
  @UseGuards(RefreshGuard)
  @HttpCode(200)
  readBookmark(
    @GetCurrentUserId() userId: string,
    @Param('id') pharmcyId: number,
  ): Promise<PharmacyBookMark> {
    return this.bookmarkService.getBookmark(pharmcyId, userId);
  }

  @ApiOperation({ summary: '북마크 삭제 ' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '삭제할 북마크 ID',
  })
  @Delete(':id')
  @UseGuards(RefreshGuard)
  @HttpCode(204)
  deleteBookmark(
    @GetCurrentUserId() userId: string,
    @Param('id') pharmacyId: number,
  ): Promise<void> {
    return this.bookmarkService.deleteBookmark(pharmacyId, userId);
  }
}
