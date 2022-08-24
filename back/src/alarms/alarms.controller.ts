import { Controller, Logger, Post } from '@nestjs/common';
import { FcmService } from 'src/fcm/fcm.service';
import { AlarmsService } from './alarms.service';

@Controller('alarms')
export class AlarmsController {
  private readonly logger = new Logger(`AlarmsController`);
  constructor(
    private readonly alarmsService: AlarmsService,
    private readonly fcmService: FcmService,
  ) {}

  @Post('set-alarm')
  async setAlarm() {
    //@Body() setAlarmDto: SetAlarmDto
    // firebase에 푸쉬 설정해주기
    // 스케줄러 설정
    await this.alarmsService.setReminders();
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
