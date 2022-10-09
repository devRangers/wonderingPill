import {
  Controller,
  Get,
  HttpCode,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pharmacy } from 'prisma/postgresClient';
import { GetCurrentUserId } from 'src/common/decorators';
import {
  PharmacySearchDto,
  PharmacySearchResponseDto
} from './dto/pharmacy.search.dto';
import { PharmacyService } from './pharmacy.service';
@ApiTags('Pharmacy API')
@Controller('pharmacies')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  @HttpCode(200)
  @Get('search')
  @ApiOperation({ summary: '약국 검색 API', description: '유저를 생성한다.' })
  @ApiQuery({
    name: 'option',
    description: '검색할 옵션 종류',
  })
  @ApiQuery({
    name: 'keyword',
    description: '검색할 내용',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: PharmacySearchResponseDto,
  })
  async pharmacySearch(
    @Query() pharmacySearchDto: PharmacySearchDto,
  ): Promise<PharmacySearchResponseDto> {
    const pharmacies: Pharmacy[] = await this.pharmacyService.pharmacySearch(
      pharmacySearchDto,
    );
    return {
      statusCode: 200,
      message: '약국 검색을 성공했습니다.',
      pharmacies,
    };
  }

  @ApiOperation({ summary: '북마크 생성 혹은 삭제' })
  @Put('bookmark/:id')
  @UseGuards()
  @ApiResponse({
    status: 201,
    description: '생성 혹은 삭제 성공',
    // type: BookmarkCreateDto,
  })
  @HttpCode(204)
  async createBookmark(
    @GetCurrentUserId() id: string,
    // @Body() bookmarkCreateDto: BookmarkCreateDto,
  ) {
    //: Promise<BookmarkCreateResponse | void>
    // this.logger.verbose(
    //   `Bookmark ${bookmarkCreateDto.pharmacyId} Created Or Delete Success!`,
    // );
    // return this.bookmarkService.createOrDeleteBookmark(
    //   userId,
    //   bookmarkCreateDto.pharmacyId,
    // );
  }
}
