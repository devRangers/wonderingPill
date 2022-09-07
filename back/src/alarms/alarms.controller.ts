import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
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
  GetAlarmSetResponseDto,
  GetAlarmsResponseDto,
  SetAlarmDto,
} from './dto';

@ApiTags('Alarms API')
@Controller('alarms')
export class AlarmsController {
  private readonly logger = new Logger(`AlarmsController`);
  constructor(private readonly alarmsService: AlarmsService) {}

  @HttpCode(201)
  @Post('set-alarm')
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
  @ApiBody({ type: SetAlarmDto })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async setAlarm(
    @GetCurrentUserId() id: string,
    @Body() setAlarmDto: SetAlarmDto,
  ) {
    await this.alarmsService.setAlarms(id, setAlarmDto);
    this.logger.verbose(`Setting User ${id} pill alarms`);
    return { statusCode: 201, message: '알림을 설정했습니다.' };
  }

  @HttpCode(200)
  @Delete('/:name')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '푸쉬 알림 취소 API',
    description: '푸쉬 알림을 취소한다.',
  })
  @ApiResponse({
    status: 200,
    description: '푸쉬 알림 취소 성공',
    type: CommonResponseDto,
  })
  @ApiParam({
    name: 'name',
    required: true,
    description: '약 이름',
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async cancelAlarm(
    @GetCurrentUserId() id: string,
    @Param('name') name: string,
  ) {
    await this.alarmsService.cancelAlarm(id, name);
    this.logger.verbose(`Canceling User ${id} pill alarm`);
    return { statusCode: 200, message: '알림을 취소했습니다.' };
  }

  @HttpCode(200)
  @Get('set-alarm/:name')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 설정창 조회 API',
    description: '알림 설정창에서 설정 내용을 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '알림 설정창 조회 성공',
    type: GetAlarmSetResponseDto,
  })
  @ApiParam({
    name: 'name',
    required: true,
    description: '약 이름',
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async getSetAlarm(
    @GetCurrentUserId() id: string,
    @Param('name') name: string,
  ): Promise<GetAlarmSetResponseDto> {
    const alarm = await this.alarmsService.getSetAlarm(id, name);
    this.logger.verbose(`Get User ${id} pill alarm set`);
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
    this.logger.verbose(`get User ${id} Alarms Success!`);
    return {
      statusCode: 200,
      message: '알림을 조회했습니다.',
      alarms,
    };
  }

  @Post('delete-alarms')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 내역 삭제 API',
    description: '알림 내역을 삭제한다.',
  })
  @ApiResponse({
    status: 201,
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
    this.logger.verbose(`Removing User ${userId} pill alarms`);
    return { statusCode: 201, message: '알림을 조회했습니다.' };
  }
}
