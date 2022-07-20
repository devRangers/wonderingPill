import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { Pharmacy } from '@prisma/client';
import {
  PharmacyQueryDto,
  PharmacyResponse,
  PharmacyCountResponse,
} from './dto/pharmacy.search.dto';
import { ApiOperation, ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
@ApiTags('Pharmacy API')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}
  @ApiOperation({ summary: '모든 약국 리스트 조회' })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: PharmacyResponse,
  })
  @Get()
  @HttpCode(200)
  async pharmacyList(): Promise<Pharmacy[]> {
    return this.pharmacyService.pharmacyList();
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
    type: PharmacyResponse,
  })
  @Get('search')
  @HttpCode(200)
  async pharmacySearch(@Query() query: PharmacyQueryDto): Promise<Pharmacy[]> {
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
    type: PharmacyCountResponse,
  })
  @Get('count')
  @HttpCode(200)
  async pharmacyCount(
    @Query() query: PharmacyQueryDto,
  ): Promise<{ count: number }> {
    const { phone, name, address } = query;
    if (phone) {
      const count = await this.pharmacyService.pharmacyCountPhone(phone);
      const body = { count };
      return body;
    } else if (name) {
      const count = await this.pharmacyService.pharmacyCountName(name);
      const body = { count };
      return body;
    } else if (address) {
      const count = await this.pharmacyService.pharmacyCountAddress(address);
      const body = { count };
      return body;
    }
  }
}
