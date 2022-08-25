import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/dto';
import { AlarmsService } from './alarms.service';
import { SetAlarmDto } from './dto';

@ApiTags('Alarms API')
@Controller('alarms')
export class AlarmsController {
  private readonly logger = new Logger(`AlarmsController`);
  constructor(private readonly alarmsService: AlarmsService) {}

  @HttpCode(201)
  @Post('set-alarm')
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
  async setAlarm(@Body() setAlarmDto: SetAlarmDto) {
    await this.alarmsService.setAlarms(setAlarmDto);
    this.logger.verbose(``);
    return { statusCode: 201, message: '알림을 설정했습니다.' };
  }

  // @Get()
  // @UseGuards(AccessGuard)
  // async getAlarms(@GetCurrentUserId() id: string) {
  //   const alarms = await this.alarmsService.getAlarms(id);
  //   this.logger.verbose(`get User Alarms Success!`);
  //   return alarms;
  // }

  // 읽음 표시

  //// alarm 삭제하기
  // @Delete()
  // @UseGuards(AccessGuard)
  // async deleteAlarms(@GetCurrentUserId() id: string) {
  //// 전체 선택인지, 뭘 선택했는지 받아야함
  // const alarms = await this.alarmsService.deleteAlarm(id);
  // return alarms;
  // }
}
