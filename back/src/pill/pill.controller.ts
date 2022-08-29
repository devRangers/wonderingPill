import {
  Controller,
  Get,
  HttpCode,
  Logger,
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
import { AccessGuard } from 'src/common/guards';
import { pillResultResponseDto } from './dto';
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

  @Put('bookmark/:')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 설정 API',
    description: '알림 예약을 설정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '알림 설정 성공',
    // type: CommonResponseDto,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async bookmarkPill(@GetCurrentUserId() id: string) {
    // 약 북마크
  }

  @HttpCode(200)
  @Get('result/:name')
  @ApiOperation({
    summary: '약 검색 결과 조회 API',
    description: '약 검색 결과를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '약 검색 결과 조회 성공',
    type: pillResultResponseDto,
  })
  @ApiParam({
    name: 'name',
    required: true,
    description: '약 이름',
  })
  async resultPill(
    @Param('name') name: string,
  ): Promise<pillResultResponseDto> {
    const result = await this.pillService.resultPill(name);
    this.logger.verbose(`get Pill Detail Success`);
    return {
      statusCode: 200,
      message: '약 검색 결과를 성공적으로 가져왔습니다.',
      result,
    };
  }
}
