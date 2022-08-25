import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { CommonResponseDto } from 'src/common/dto';
import { AccessGuard } from 'src/common/guards';
import { AlarmsService } from './alarms.service';
import { DeleteAlarmsDto, GetAlarmsResponseDto, SetAlarmDto } from './dto';

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
  @Get()
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
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async getAlarms(
    @GetCurrentUserId() id: string,
  ): Promise<GetAlarmsResponseDto> {
    const alarms = await this.alarmsService.getAlarms(id);
    this.logger.verbose(`get User ${id} Alarms Success!`);
    return {
      statusCode: 200,
      message: '알림을 조회했습니다.',
      result: alarms,
    };
  }

  @Post('delete')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '알림 삭제 API',
    description: '알림을 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '알림 삭제 성공',
    type: CommonResponseDto,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async deleteAlarms(
    @Body() deleteAlarmsDto: DeleteAlarmsDto,
    @GetCurrentUserId() userId: string,
  ): Promise<CommonResponseDto> {
    await this.alarmsService.deleteAlarm(deleteAlarmsDto, userId);
    return { statusCode: 201, message: '알림을 조회했습니다.' };
  }
}
