import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessGuard } from 'src/common/guards';
import { FcmService } from 'src/fcm/fcm.service';
import { AlarmsService } from './alarms.service';
import { SetAlarmDto } from './dto';

@Controller('alarms')
export class AlarmsController {
  private readonly logger = new Logger(`AlarmsController`);
  constructor(
    private readonly alarmsService: AlarmsService,
    private readonly fcmService: FcmService,
  ) {}

  @Post('set-alarm')
  async setAlarm(@Body() setAlarmDto: SetAlarmDto) {
    // firebase에 푸쉬 설정해주기
    await this.fcmService.sendPushAlarm(setAlarmDto.deviceToken);
    // 스케줄러 설정
  }

  @Get()
  @UseGuards(AccessGuard)
  async getAlarms(@GetCurrentUserId() id: string) {
    const alarms = await this.alarmsService.getAlarms(id);
    this.logger.verbose(`get User Alarms Success!`);
    return alarms;
  }

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
