import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agenda } from 'agenda/es';
import { FcmService } from 'src/fcm/fcm.service';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteAlarmsDto, SetAlarmDto } from './dto';

@Injectable()
export class AlarmsService {
  constructor(
    private prismaMongo: PrismaMongoService,
    private prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly fcmService: FcmService,
  ) {}

  async setAgenda(id: string, pillName: string): Promise<Agenda> {
    const agenda = new Agenda({
      db: {
        address: this.configService.get('DATABASE_URL_MONGO'),
        collection: 'pillAlarms',
      },
      name: id + pillName,
    });
    return agenda;
  }

  async setAlarms(id: string, setAlarmDto: SetAlarmDto) {
    const { vip, hour, minute, pillName, userName, repeatTime, deviceToken } =
      setAlarmDto;

    await this.saveDevicetoken(deviceToken, id);

    try {
      const agenda = await this.setAgenda(id, pillName);

      agenda.define(id + pillName, async () => {
        await this.fcmService.sendPushAlarm(deviceToken, userName, pillName);
        const time = await this.getCurrTime();

        await this.prismaMongo.reminder.create({
          data: { user_id: id, user_name: userName, pill_name: pillName, time },
        });
        if (repeatTime !== 0) {
          await this.setRepeatAlarm(repeatTime, agenda, id, pillName);
        }
      });

      (async function () {
        const job = agenda.create(id + pillName);
        await agenda.start();
        await job
          .repeatEvery(`${minute} ${hour} * * ${vip.join(',')}`, {
            timezone: 'Asia/Seoul',
          })
          .save();
      })();

      await this.setAlarmMark(id, true, pillName);
    } catch (error) {
      throw new ForbiddenException('알림을 예약하지 못했습니다.');
    }
  }

  async saveDevicetoken(deviceToken: string, id: string) {
    try {
      const user = await this.prismaMongo.user.findUnique({
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
      throw new ForbiddenException('user를 저장하지 못했습니다.');
    }
  }

  async getCurrTime() {
    const fullTime = new Date(Date.now());
    const time =
      fullTime.getFullYear().toString() +
      '.' +
      (fullTime.getMonth() + 1).toString() +
      '.' +
      fullTime.getDate().toString() +
      ' ' +
      fullTime.getHours().toString() +
      ':' +
      fullTime.getMinutes().toString();

    return time;
  }

  async cancelAlarm(id: string, name: string) {
    const agenda = await this.setAgenda(id, name);
    await agenda.cancel({ name: id + name });
  }

  async setAlarmMark(id: string, check: boolean, pillName: string) {
    try {
      const userPills = await this.prisma.user.findUnique({
        where: { id },
        select: {
          PillBookMark: {
            select: { id: true, Pill: { select: { name: true } } },
          },
        },
      });
      let pillBookMark_id;
      userPills.PillBookMark.every(function (pill) {
        if (pill.Pill.name === pillName) {
          pillBookMark_id = pill.id;
          return false;
        } else {
          return true;
        }
      });

      await this.prisma.pillBookMark.update({
        where: { id: pillBookMark_id },
        data: { alarm: check },
      });
    } catch (error) {
      throw new ForbiddenException('알림을 체크하지 못했습니다.');
    }
  }

  async setRepeatAlarm(
    repeatTime: number,
    agenda: Agenda,
    id: string,
    pillName: string,
  ) {
    try {
      (async function () {
        const job = agenda.create(id + pillName + repeatTime.toString());
        await agenda.start();
        await job.schedule(`in ${repeatTime} minutes`).save();
      })();
    } catch (error) {
      throw new ForbiddenException('반복 시간을 설정하지 못했습니다.');
    }
  }

  async getAlarms(id: string) {
    try {
      const alarms = await this.prismaMongo.reminder.findMany({
        where: { user_id: id },
      });
      return alarms;
    } catch (error) {
      throw new ForbiddenException('알림을 조회하지 못했습니다.');
    }
  }

  async deleteAlarm(deleteAlarmsDto: DeleteAlarmsDto, userId: string) {
    try {
      const { ids } = deleteAlarmsDto;
      await this.prismaMongo.reminder.deleteMany({
        where: { id: { in: ids }, user_id: userId },
      });
    } catch (error) {
      throw new ForbiddenException('알림을 삭제하지 못했습니다.');
    }
  }
}
