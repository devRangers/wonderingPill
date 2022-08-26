import { Controller, Get, HttpCode, Logger, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PillService } from './pill.service';

@ApiTags('Pill API')
@Controller('pill')
export class PillController {
  private readonly logger = new Logger(`AlarmsController`);
  constructor(private readonly pillService: PillService) {}

  @HttpCode(200)
  @Get('search')
  @ApiOperation({
    summary: '약 검색필터 API',
    description: '약 검색필터로 약을 검색한다.',
  })
  @ApiResponse({
    status: 200,
    description: '약 검색 성공',
    // type: ,
  })
  @ApiQuery({
    name: 'shape',
    required: true,
    description: '약 제형',
  })
  @ApiQuery({
    name: 'colors',
    required: true,
    description: '약 색상',
  })
  @ApiQuery({
    name: 'mark',
    required: true,
    description: '약 문양 여부',
  })
  @ApiQuery({
    name: 'letters',
    required: true,
    description: '약 글자',
  })
  @ApiQuery({
    name: 'name',
    required: true,
    description: '약 이름',
  })
  async searchPill(@Query() query) {
    const pills = await this.pillService.searchPill(query);
    this.logger.verbose(`Searching Pill Success`);
    return {
      statusCode: 200,
      message: '약 검색 결과를 성공적으로 가져왔습니다.',
      pills,
    };
  }
}
