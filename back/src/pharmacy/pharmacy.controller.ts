import {
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Pharmacy } from 'prisma/postgresClient';
import { GetCurrentUserId } from 'src/common/decorators';
import { CommonResponseDto } from 'src/common/dto';
import { AccessGuard } from 'src/common/guards';
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
  @UseGuards(AccessGuard)
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
