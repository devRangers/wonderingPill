import {
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { CommonResponseDto } from 'src/common/dto';
import { AccessGuard } from 'src/common/guards';
import {
  pharmacyBookmarkListResponse,
  pharmacyBookmarkListResponseDto,
  PharmacySearchDto,
  PharmacySearchResponse,
  PharmacySearchResponseDto,
} from './dto/pharmacy.search.dto';
import { PharmacyService } from './pharmacy.service';
@ApiTags('Pharmacies API')
@Controller('pharmacies')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  @HttpCode(200)
  @Get('search')
  @ApiOperation({ summary: '약국 검색 API', description: '유저를 생성한다.' })
  @ApiQuery({
    name: 'option',
    required: true,
    description: '검색할 옵션 종류',
  })
  @ApiQuery({
    name: 'keyword',
    required: true,
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
    const pharmacies: PharmacySearchResponse[] =
      await this.pharmacyService.pharmacySearch(pharmacySearchDto);
    return {
      statusCode: 200,
      message: '약국 검색을 성공했습니다.',
      pharmacies,
    };
  }

  @HttpCode(200)
  @Get('bookmark-list')
  @UseGuards(AccessGuard)
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  @ApiOperation({
    summary: '약국 북마크 리스트 조회 API',
    description: '약국 북마크 리스트를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: pharmacyBookmarkListResponseDto,
  })
  async pharmacyBookmarkList(@GetCurrentUserId() id: string) {
    const lists: pharmacyBookmarkListResponse =
      await this.pharmacyService.pharmacyBookmarkList(id);
    return {
      statusCode: 200,
      message: '약국 북마크 리스트를 조회했습니다.',
      lists,
    };
  }

  @ApiOperation({ summary: '북마크 생성 혹은 삭제' })
  @Put('bookmark/:id')
  @UseGuards(AccessGuard)
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  @ApiParam({
    name: 'id',
    required: true,
    description: '약국 id',
  })
  @ApiResponse({
    status: 200,
    description: '생성 혹은 삭제 성공',
    type: CommonResponseDto,
  })
  @HttpCode(200)
  async createBookmark(
    @GetCurrentUserId() id: string,
    @Param('id') pharmacyId: number,
  ): Promise<CommonResponseDto> {
    await this.pharmacyService.pharmacyBookmark(id, pharmacyId);
    return { statusCode: 200, message: '약국 북마크를 성공했습니다.' };
  }
}
