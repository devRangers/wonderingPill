import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { CommonResponseDto } from 'src/common/dto';
import { AccessGuard } from 'src/common/guards';
import { AlarmsService } from './alarms.service';
import {
  DeleteAlarmsDto,
  GetAlarmSettingResponse,
  GetAlarmSettingResponseDto,
  GetAlarmsResponseDto,
  SetAlarmDto,
} from './dto';

@ApiTags('Alarms API')
@Controller('alarms')
export class AlarmsController {
  private readonly logger = new Logger(`AlarmsController`);
  constructor(private readonly alarmsService: AlarmsService) {}

  @HttpCode(201)
  @Post('set')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 설정 API',
    description: '알림 예약을 설정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '알림 설정 성공',
    type: CommonResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '알림 설정 실패',
  })
  @ApiBody({ type: SetAlarmDto })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async setAlarm(
    @GetCurrentUserId() id: string,
    @Body() setAlarmDto: SetAlarmDto,
  ) {
    await this.alarmsService.setAlarms(id, setAlarmDto);
    this.logger.log(`POST /set Success!`);
    return { statusCode: 201, message: '알림을 설정했습니다.' };
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '푸쉬 알림 취소 API',
    description: '푸쉬 알림을 취소한다.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '북마크 아이디',
  })
  @ApiResponse({
    status: 200,
    description: '푸쉬 알림 취소 성공',
    type: CommonResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '푸쉬 알림 취소 실패',
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async cancelAlarm(
    @GetCurrentUserId() id: string,
    @Param('id') pillBookmarkId: string,
  ) {
    await this.alarmsService.cancelAlarm(id, pillBookmarkId);
    this.logger.log(`PUT /:id Success!`);
    return { statusCode: 200, message: '알림을 취소했습니다.' };
  }

  @HttpCode(200)
  @Get('set/:id')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 설정창 조회 API',
    description: '알림 설정창에서 설정 내용을 조회한다.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '약 북마크 아이디',
  })
  @ApiResponse({
    status: 200,
    description: '알림 설정창 조회 성공',
    type: GetAlarmSettingResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '알림 설정창 조회 실패',
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async getAlarmSetting(
    @GetCurrentUserId() id: string,
    @Param('id') pillBookmarkId: string,
  ): Promise<GetAlarmSettingResponseDto> {
    const alarm: GetAlarmSettingResponse =
      await this.alarmsService.getAlarmSetting(id, pillBookmarkId);
    this.logger.log(`GET /set/:id Success!`);
    return {
      statusCode: 200,
      message: '알림 설정을 읽어왔습니다.',
      alarm,
    };
  }

  @HttpCode(200)
  @Get(':page')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 조회 API',
    description: '알림 내역을 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '알림 조회 성공',
    type: GetAlarmsResponseDto,
  })
  @ApiParam({
    name: 'page',
    required: true,
    description: '알림 페이지',
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async getAlarms(
    @GetCurrentUserId() id: string,
    @Param('page') page: number,
  ): Promise<GetAlarmsResponseDto> {
    const alarms = await this.alarmsService.getAlarms(id, page);
    this.logger.log(`GET /:page Success!`);
    return {
      statusCode: 200,
      message: '알림을 조회했습니다.',
      alarms,
    };
  }

  // TODO: 복용 체크
  @HttpCode(200)
  @Put('check')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '복용 체크 API',
    description: '알림 내역 중, 약 복용 여부를 체크한다.',
  })
  @ApiResponse({
    status: 200,
    description: '복용 체크 성공',
    type: CommonResponseDto,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async checkAlarm(
    @Body() deleteAlarmsDto: DeleteAlarmsDto,
    @GetCurrentUserId() userId: string,
  ): Promise<CommonResponseDto> {
    await this.alarmsService.checkAlarm();
    this.logger.log(`PUT /check Success!`);
    return { statusCode: 200, message: '알림을 삭제했습니다.' };
  }

  @HttpCode(200)
  @Post('delete')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 내역 삭제 API',
    description: '알림 내역을 삭제한다.',
  })
  @ApiResponse({
    status: 200,
    description: '알림 내역 삭제 성공',
    type: CommonResponseDto,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async deleteAlarms(
    @Body() deleteAlarmsDto: DeleteAlarmsDto,
    @GetCurrentUserId() userId: string,
  ): Promise<CommonResponseDto> {
    await this.alarmsService.deleteAlarm(deleteAlarmsDto, userId);
    this.logger.log(`POST /delete Success!`);
    return { statusCode: 200, message: '알림을 삭제했습니다.' };
  }
}
