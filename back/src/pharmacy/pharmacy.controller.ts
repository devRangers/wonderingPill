import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PharmacyQueryDto } from './dto/pharmacy.search.dto';
import {
  PharmacyCountResponse,
  PharmacyListResponse,
} from './interface/pharmacy.interface';
import { PharmacyService } from './pharmacy.service';
@ApiTags('Pharmacy API')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}
  @ApiOperation({ summary: '모든 약국 리스트 조회' })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
  })
  @Get()
  @HttpCode(200)
  async pharmacyList(): Promise<PharmacyListResponse> {
    const pharmacy = this.pharmacyService.pharmacyList();
    return pharmacy;
  }

  @ApiOperation({ summary: '약국 검색 API' })
  @ApiQuery({
    name: 'phone',
    required: false,
    description: '검색할 전화번호',
  })
  @ApiQuery({
    name: 'address',
    required: false,
    description: '검색할 주소',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '검색할 약국 이름',
  })
  @ApiQuery({
    name: 'start',
    required: false,
    description: '페이지네이션 시작 위치',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
  })
  @Get('search')
  @HttpCode(200)
  async pharmacySearch(
    @Query() query: PharmacyQueryDto,
  ): Promise<PharmacyListResponse> {
    const { phone, name, address, start } = query;
    if (phone) {
      return await this.pharmacyService.pharmacySearchPhone(phone, start);
    } else if (name) {
      return await this.pharmacyService.pharmacySearchName(name, start);
    } else if (address) {
      return await this.pharmacyService.pharmacySearchAddress(address, start);
    }
  }

  @ApiOperation({ summary: '약국 검색 결과 카운트 API' })
  @ApiQuery({
    name: 'phone',
    required: false,
    description: '검색할 전화번호',
  })
  @ApiQuery({
    name: 'address',
    required: false,
    description: '검색할 주소',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '검색할 약국 이름',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
  })
  @Get('count')
  @HttpCode(200)
  async pharmacyCount(
    @Query() query: PharmacyQueryDto,
  ): Promise<PharmacyCountResponse> {
    const { phone, name, address } = query;
    if (phone) {
      return await this.pharmacyService.pharmacyCountPhone(phone);
    } else if (name) {
      return await this.pharmacyService.pharmacyCountName(name);
    } else if (address) {
      return await this.pharmacyService.pharmacyCountAddress(address);
    }
  }
}
