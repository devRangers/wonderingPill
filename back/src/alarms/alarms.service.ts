import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlarmsService {
  constructor(private prisma: PrismaService) {}

  async getAlarms(id: string) {
    try {
      const alarms = await this.prisma.alarm.findUnique({
        where: { user_id: id },
      });
      return alarms;
    } catch (error) {
      throw new ForbiddenException('알림을 조회하지 못했습니다.');
    }
  }
}
