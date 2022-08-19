import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { RefreshGuard } from 'src/common/guards';
import { BookmarkService } from './bookmark.service';
import {
  BookmarkCreateDto,
  BookmarkGetResponseDto,
  BookmarkListResponseDto,
} from './dto/bookmark.dto';
import {
  BookmarkCreateResponse,
  BookmarkGetResponse,
  BookmarkListResponse,
} from './interface/bookmark.interface';
@ApiTags('Bookmark API')
@Controller('bookmark')
export class BookmarkController {
  private logger = new Logger(`BookmarkController`);
  constructor(private bookmarkService: BookmarkService) {}
  @ApiOperation({ summary: '북마크 생성 혹은 삭제' })
  @Put()
  @UseGuards(RefreshGuard)
  @ApiOperation({ summary: '북마크 생성 혹은 삭제 API' })
  @ApiResponse({
    status: 201,
    description: '생성 혹은 삭제 성공',
    type: BookmarkCreateDto,
  })
  @HttpCode(204)
  async createBookmark(
    @GetCurrentUserId() userId: string,
    @Body() bookmarkCreateDto: BookmarkCreateDto,
  ): Promise<BookmarkCreateResponse | void> {
    this.logger.verbose(
      `Bookmark ${bookmarkCreateDto.pharmacyId} Created Or Delete Success!`,
    );
    return this.bookmarkService.createOrDeleteBookmark(
      userId,
      bookmarkCreateDto.pharmacyId,
    );
  }
  @ApiOperation({ summary: '북마크 리스트 조회' })
  @Get('list')
  @UseGuards(RefreshGuard)
  @ApiOperation({ summary: '북마크 리스트 조회 API' })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: BookmarkListResponseDto,
  })
  @HttpCode(200)
  async listBookmark(
    @GetCurrentUserId() id: string,
  ): Promise<BookmarkListResponse> {
    this.logger.verbose(`Bookmark ${id} list view Success!`);
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
  @ApiOperation({ summary: '북마크 개별 조회 API' })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: BookmarkGetResponseDto,
  })
  @HttpCode(200)
  async readBookmark(
    @GetCurrentUserId() userId: string,
    @Param('id') pharmcyId: number,
  ): Promise<BookmarkGetResponse> {
    this.logger.verbose(`Bookmark ${pharmcyId} Read Success!`);
    return this.bookmarkService.getBookmark(pharmcyId, userId);
  }

  // @ApiOperation({ summary: '북마크 삭제 ' })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   description: '삭제할 북마크 ID',
  // })
  // @Delete(':id')
  // @UseGuards(RefreshGuard)
  // @ApiOperation({ summary: '북마크 삭제 API' })
  // @HttpCode(204)
  // async deleteBookmark(
  //   @GetCurrentUserId() userId: string,
  //   @Param('id') pharmacyId: number,
  // ): Promise<void> {
  //   this.logger.verbose(`Bookmark ${pharmacyId} Delete Success!`);
  //   await this.bookmarkService.deleteBookmark(pharmacyId, userId);
  // }
}
