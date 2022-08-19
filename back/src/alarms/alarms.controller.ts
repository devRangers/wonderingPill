import { Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessGuard } from 'src/common/guards';
import { AlarmsService } from './alarms.service';

@Controller('alarms')
export class AlarmsController {
  private readonly logger = new Logger(`AlarmsController`);
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post('set-alarm')
  async setAlarm() {
    // 알람 DB에 설정 저장하기
    // firebase에 푸쉬 설정해주기
  }

  @Get()
  @UseGuards(AccessGuard)
  async getAlarms(@GetCurrentUserId() id: string) {
    const alarms = await this.alarmsService.getAlarms(id);
    return alarms;
  }

  // alarm 삭제하기
  // @Delete()
  // @UseGuards(AccessGuard)
  // async deleteAlarms(@GetCurrentUserId() id: string) {
  //   const alarms = await this.alarmsService.getAlarms(id);
  //   return alarms;
  // }
}
