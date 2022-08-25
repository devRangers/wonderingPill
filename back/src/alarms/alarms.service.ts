import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agenda } from 'agenda/es';
import { FcmService } from 'src/fcm/fcm.service';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { DeleteAlarmsDto, SetAlarmDto } from './dto';

@Injectable()
export class AlarmsService {
  constructor(
    private prismaMongo: PrismaMongoService,
    private readonly configService: ConfigService,
    private readonly fcmService: FcmService,
  ) {}

  async setAlarms(id: string, setAlarmDto: SetAlarmDto) {
    const { vip, hour, minute, pillName, userName, repeatTime, deviceToken } =
      setAlarmDto;

    await this.saveDevicetoken(deviceToken, id);
    try {
      const agenda = new Agenda({
        db: {
          address: this.configService.get('DATABASE_URL_MONGO'),
          collection: 'pillAlarms',
        },
        name: userName + pillName,
      });

      agenda.define(userName + pillName, async () => {
        await this.fcmService.sendPushAlarm(deviceToken, userName, pillName);
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

        await this.prismaMongo.reminder.create({
          data: { user_id: id, user_name: userName, pill_name: pillName, time },
        });
      });

      (async function () {
        const job = agenda.create(userName + pillName);
        await agenda.start();
        await job
          .repeatEvery(`${minute} ${hour} * * ${vip.join(',')}`, {
            timezone: 'Asia/Seoul',
          })
          .save();
      })();

      if (repeatTime !== 0) {
        await this.setRepeatAlarm(repeatTime, agenda, userName, pillName);
      }
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

  async setRepeatAlarm(repeatTime: number, agenda, userName, pillName) {
    try {
      (async function () {
        const job = agenda.create(userName + pillName + repeatTime.toString());
        await agenda.start();
        await job
          // .repeatEvery(`* * * * *`, {
          //   timezone: 'Asia/Seoul',
          // })
          .save();
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
      const alarms = await this.prismaMongo.reminder.deleteMany({
        where: { id: { in: ids }, user_id: userId },
      });
      return alarms;
    } catch (error) {
      throw new ForbiddenException('알림을 삭제하지 못했습니다.');
    }
  }
}
