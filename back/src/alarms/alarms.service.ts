import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agenda } from 'agenda/es';
import { FcmService } from 'src/fcm/fcm.service';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SetAlarmDto } from './dto';

@Injectable()
export class AlarmsService {
  constructor(
    private prisma: PrismaService,
    private prismaMongo: PrismaMongoService,
    private readonly configService: ConfigService,
    private readonly fcmService: FcmService,
  ) {}

  async setAlarms(setAlarmDto: SetAlarmDto) {
    const { vip, hour, minute, pillName, userName, repeatTime, deviceToken } =
      setAlarmDto;
    await this.isDevicetoken(deviceToken, userName);
    const agenda = new Agenda({
      db: {
        address: this.configService.get('DATABASE_URL_MONGO'),
        collection: 'pillAlarms',
      },
      name: userName + pillName,
    });

    agenda.define(userName + pillName, async () => {
      await this.fcmService.sendPushAlarm(deviceToken, userName, pillName);
    });

    (async function () {
      const job = agenda.create(userName + pillName);
      await agenda.start();
      await job
        .repeatEvery(`${minute} ${hour} * * ${vip.join(',')}`, {
          timezone: 'Asia/Seoul',
        })
        .setShouldSaveResult(true)
        .save();
    })();

    if (repeatTime !== 0) {
      await this.setRepeatAlarm(repeatTime, agenda, userName, pillName);
    }
  }

  async isDevicetoken(deviceToken: string, name: string) {
    const user = await this.prismaMongo.user.findUnique({
      where: { deviceToken },
    });
    if (!user) {
      await this.prismaMongo.user.create({
        data: {
          deviceToken,
          name,
        },
      });
    }
  }

  async setRepeatAlarm(repeatTime: number, agenda, userName, pillName) {
    (async function () {
      const job = agenda.create(userName + pillName + repeatTime.toString());
      await agenda.start();
      await job
        // .repeatEvery(`* * * * *`, {
        //   timezone: 'Asia/Seoul',
        // })
        .save();
    })();
  }

  // async getAlarms(id: string) {
  //   try {
  //     const alarms = await this.prisma.alarm.findMany({
  //       where: { PillBookMark: { user_id: id } },
  //       select: {
  //         PillBookMark: {
  //           select: {
  //             User: {
  //               select: { name: true },
  //             },
  //             Pill: {
  //               select: {
  //                 name: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //     return alarms;
  //   } catch (error) {
  //     throw new ForbiddenException('알림을 조회하지 못했습니다.');
  //   }
  // }
}
