import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'prisma/mongoClient';
import { AgendaService } from 'src/infras/agenda/agenda.service';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteAlarmsDto, GetAlarmSettingResponse, SetAlarmDto } from './dto';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly prismaMongo: PrismaMongoService,
    private readonly prisma: PrismaService,
    private readonly agnedaService: AgendaService,
  ) {}

  /** 현재 로그인한 유저의 북마크한 알약 알림 설정 */
  async setAlarms(id: string, setAlarmDto: SetAlarmDto) {
    const {
      vip,
      hour,
      minute,
      repeatTime,
      pillName,
      userName,
      deviceToken,
      pillBookmarkId,
    } = setAlarmDto;

    await this.saveDevicetoken(deviceToken, id);
    try {
      await this.agnedaService.defineEveryAgenda(
        id,
        pillBookmarkId,
        deviceToken,
        userName,
        pillName,
        repeatTime,
        vip,
      );

      // 한번만 알림을 전송하고 싶을 때 길이가 8인 vip 생성
      if (vip.length === 0) {
        vip.push(0, 1, 2, 3, 4, 5, 6, 7);
      }

      await this.agnedaService.setEveryAgenda(
        minute,
        hour,
        vip,
        repeatTime,
        id,
        pillBookmarkId,
      );

      await this.setAlarmMark(true, pillBookmarkId);
    } catch (error) {
      throw new ForbiddenException('알림을 예약하지 못했습니다.');
    }
  }

  /** MongoDB에 유저 정보가 존재하지 않으면 deviceToken 저장 */
  async saveDevicetoken(deviceToken: string, id: string) {
    try {
      const user: User = await this.prismaMongo.user.findUnique({
        where: { user_id: id },
      });
      if (!user) {
        await this.prismaMongo.user.create({
          data: {
            deviceToken,
            user_id: id,
          },
        });
      }
    } catch (error) {
      throw new NotFoundException('회원 정보를 저장하지 못했습니다.');
    }
  }

  /** 알림 설정 여부 체크 */
  async setAlarmMark(check: boolean, pillBookmarkId: string) {
    try {
      await this.prisma.pillBookMark.update({
        where: { id: pillBookmarkId },
        data: { alarm: check }, // 알림 설정할땐 true, 알림 삭제할땐 false
      });
    } catch (error) {
      throw new NotFoundException('알림을 체크하지 못했습니다.');
    }
  }

  /** 알림 설정 여부 체크 */
  async cancelAlarm(id: string, pillBookmarkId: string) {
    await this.agnedaService.deleteAgenda(id, pillBookmarkId);
    await this.setAlarmMark(false, pillBookmarkId);
  }

  /** 알림 설정 조회 */
  async getAlarmSetting(
    id: string,
    pillBookmarkId: string,
  ): Promise<GetAlarmSettingResponse> {
    const pillName: string = await this.getPillName(pillBookmarkId);
    return await this.agnedaService.getAgenda(id, pillBookmarkId, pillName);
  }

  async getAlarms(id: string, page: number) {
    try {
      const alarms = await this.prismaMongo.reminder.findMany({
        where: { user_id: id },
        orderBy: [
          {
            time: 'desc',
          },
        ],
        skip: (page - 1) * 10,
        take: 10,
        select: {
          id: true,
          user_name: true,
          pill_name: true,
          time: true,
          check: true,
          pillBookmarkId: true,
        },
      });
      return alarms;
    } catch (error) {
      throw new NotFoundException('알림을 조회하지 못했습니다.');
    }
  }

  async checkAlarm() {}

  async deleteAlarm(deleteAlarmsDto: DeleteAlarmsDto, userId: string) {
    try {
      const { ids } = deleteAlarmsDto;
      await this.prismaMongo.reminder.deleteMany({
        where: { id: { in: ids }, user_id: userId },
      });
    } catch (error) {
      throw new NotFoundException('알림을 삭제하지 못했습니다.');
    }
  }

  async getPillName(id: string) {
    try {
      const bookmark = await this.prisma.pillBookMark.findUnique({
        where: { id },
        select: { Pill: { select: { name: true } } },
      });
      return bookmark.Pill.name;
    } catch (error) {
      throw new NotFoundException('약을 조회하지 못했습니다.');
    }
  }
}
