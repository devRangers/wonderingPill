import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
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
import { GcsService } from 'src/infras/gcs/gcs.service';
import {
  GetPresignedUrlResponse,
  GetPresignedUrlResponseDto,
} from 'src/users/dto';
import { prefixConstant } from 'src/utils/prefix.constant';
import {
  pillResultResponseDto,
  pillSearchDto,
  pillSearchResponseDto,
} from './dto';
import { PillService } from './pill.service';

@ApiTags('Pills API')
@Controller('pills')
export class PillController {
  private readonly logger = new Logger(`${prefixConstant}/pills`);
  constructor(
    private readonly pillService: PillService,
    private readonly gcsService: GcsService,
  ) {}

  @HttpCode(200)
  @Get('search')
  @ApiOperation({
    summary: '약 검색필터 API',
    description: '약 검색필터로 약을 검색한다.',
  })
  @ApiResponse({
    status: 200,
    description: '약 검색 성공',
    type: pillSearchResponseDto,
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
    required: false,
    description: '약 글자',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '약 이름',
  })
  async searchPill(@Query() query: pillSearchDto) {
    const pills = await this.pillService.searchPill({ query });
    this.logger.log(`GET /search Success!`);
    return {
      statusCode: 200,
      message: '약 검색 결과를 성공적으로 가져왔습니다.',
      pills,
    };
  }

  @Put('bookmark/:id')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알약 북마크 API',
    description: '알약을 북마크 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '알약 북마크 성공',
    type: CommonResponseDto,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async bookmarkPill(
    @GetCurrentUserId() id: string,
    @Param('id', ParseIntPipe) pill_id: number,
  ): Promise<CommonResponseDto> {
    await this.pillService.bookmarkPill(id, pill_id);
    this.logger.log(`PUT /bookmark/:id Success!`);
    return {
      statusCode: 200,
      message: '북마크 설정을 완료했습니다.',
    };
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
    @Param('name', ValidationPipe) name: string,
  ): Promise<pillResultResponseDto> {
    const result = await this.pillService.resultPill(name);
    this.logger.log(`GET /result/:name Success!`);
    return {
      statusCode: 200,
      message: '약 검색 결과를 성공적으로 가져왔습니다.',
      result,
    };
  }

  // signed url 발행 api
  @HttpCode(200)
  @Get('search/presigned-url/:id')
  @ApiOperation({
    summary: '약 검색 사진 저장 API',
    description: '약 검색 사진를 저장한다.',
  })
  @ApiResponse({
    status: 200,
    description: '약 검색 사진 저장 성공',
    type: GetPresignedUrlResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'presigned 발급용 id',
  })
  async getSignedurl(
    @Param('id', ValidationPipe) id: string,
  ): Promise<GetPresignedUrlResponseDto> {
    const { url, fileName }: GetPresignedUrlResponse =
      await this.gcsService.getPillUrl(id);
    this.logger.log(`GET /search/:id Success!`);
    return {
      statusCode: 200,
      message: '약 검색 사진 presigned-url을 발급하였습니다.',
      result: { url, fileName },
    };
  }

  // gcs에서 삭제하는 api
  @HttpCode(200)
  @Delete('search/presigned-url/:id')
  @ApiOperation({
    summary: '약 검색 사진 삭제 API',
    description: '약 검색 사진을 삭제한다.',
  })
  @ApiResponse({
    status: 200,
    description: '약 검색 사진 삭제 성공',
    type: CommonResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'presigned 발급용 id',
  })
  async deleteUrl(
    @Param('id', ValidationPipe) id: string,
  ): Promise<CommonResponseDto> {
    await this.gcsService.deletePillImg(id);
    this.logger.log(`DELETE /search/:id Success!`);
    return {
      statusCode: 200,
      message: '약 검색 사진을 성공적으로 삭제했습니다.',
    };
  }
}
