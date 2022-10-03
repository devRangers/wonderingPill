import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agenda } from 'agenda/es';
import { FcmService } from 'src/infras/fcm/fcm.service';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';

@Injectable()
export class AgendaService {
  private agenda;

  constructor(
    private readonly configService: ConfigService,
    private readonly fcmService: FcmService,
    private readonly prismaMongo: PrismaMongoService,
  ) {
    this.agenda = new Agenda({
      db: {
        address: this.configService.get('DATABASE_URL_MONGO'),
        collection: 'pillAlarms',
      },
      name: 'pill-alarms-set',
    });
  }

  /** Agneda 정의 */
  async defineEveryAgenda(
    id: string,
    pillBookmarkId: string,
    deviceToken: string,
    userName: string,
    pillName: string,
    repeatTime: number,
    vip: number[],
  ) {
    const agenda: Agenda = await this.agenda;
    try {
      agenda.define(id + '-' + pillBookmarkId, async () => {
        await this.fcmService.sendPushAlarm(deviceToken, userName, pillName); // 알림 전송
        const time: string = await this.getCurrTime();
        await this.prismaMongo.reminder.create({
          data: {
            user_id: id,
            user_name: userName,
            pill_name: pillName,
            time,
            check: false,
            pillBookmarkId,
          },
        }); // 알림 전송 기록

        // 반복 시간 설정
        if (repeatTime !== 0) {
          await this.setRepeatAgenda(
            repeatTime,
            id,
            pillBookmarkId,
            deviceToken,
            userName,
            pillName,
          );
        }

        // vip은 정상적일 때 7이하의 길이를 가짐. 8이라면 한번만 작동해야하는 알림이므로 삭제
        if (vip.length === 8) {
          await agenda.cancel({ name: id + '-' + pillBookmarkId });
        }
      });
    } catch (error) {
      throw new NotFoundException('스케줄을 정의하지 못했습니다.');
    }
  }

  /** 알림에 사용할 알림 전송 시간 생성 */
  async getCurrTime(): Promise<string> {
    const fullTime = new Date(Date.now());
    const year: string = fullTime.getFullYear().toString();
    const month: string = (fullTime.getMonth() + 1).toString();
    const date: string = fullTime.getDate().toString();
    const hour: string = ('0' + fullTime.getHours()).slice(-2);
    const minute: string = ('0' + fullTime.getMinutes()).slice(-2);

    const time: string =
      year + '.' + month + '.' + date + ' ' + hour + ':' + minute;
    return time;
  }

  /** 일정 시간 뒤 같은 알림을 한번 더 반복하는 스케줄 생성 */
  async setRepeatAgenda(
    repeatTime: number,
    id: string,
    pillBookmarkId: string,
    deviceToken: string,
    userName: string,
    pillName: string,
  ) {
    const agenda: Agenda = await this.agenda;
    try {
      agenda.define(id + '-' + pillBookmarkId + ':repeat', async () => {
        await this.fcmService.sendPushAlarm(deviceToken, userName, pillName); // 알림 전송
        const time: string = await this.getCurrTime();
        await this.prismaMongo.reminder.create({
          data: {
            user_id: id,
            user_name: userName,
            pill_name: pillName,
            time,
            check: false,
            pillBookmarkId,
          },
        }); // 알림 전송 기록
      });

      (async function () {
        const job = agenda.create(id + '-' + pillBookmarkId + ':repeat');
        await agenda.start();
        await job
          .schedule(
            `in ${repeatTime} minutes`,
            id + '-' + pillBookmarkId + ':repeat',
          )
          .save();
      })();
    } catch (error) {
      throw new NotFoundException('반복 스케줄을 설정하지 못했습니다.');
    }
  }

  /** defineEveryAgenda에서 정의된 스케줄 생성  */
  async setEveryAgenda(
    minute: number,
    hour: number,
    vip: number[],
    repeatTime: number,
    id: string,
    pillBookmarkId: string,
  ) {
    const agenda = await this.agenda;
    try {
      (async function () {
        await agenda.start();
        await agenda.every(
          `${minute} ${hour} * * ${vip.join(',')}`,
          id + '-' + pillBookmarkId,
          {
            repeatTime,
            timezone: 'Asia/Seoul',
          },
        );
      })();
    } catch (error) {
      throw new NotFoundException('스케줄을 설정하지 못했습니다.');
    }
  }

  /** 정의된 스케줄을 조회해서 설정 된 알림을 읽어옴  */
  async getAgenda(id, pillBookmarkId, pillName) {
    // TODO: 타입 지정
    const agenda = await this.agenda;
    try {
      const result = (async function () {
        await agenda.start();
        const job = await agenda.jobs({ name: id + '-' + pillBookmarkId });
        if (job.length === 0 && job.length === 8) {
          return {
            minute: 0,
            hour: 0,
            vip: [],
            repeatTime: 0,
            pillName,
          };
        } else {
          const alarm = job.pop().attrs;
          const arr = alarm.repeatInterval.split(' ');
          const repeat = alarm.data.repeatTime;
          return {
            minute: Number(arr[0]),
            hour: Number(arr[1]),
            vip: arr[4].split(',').map((v) => Number(v)),
            repeatTime: repeat,
            pillName,
          };
        }
      })();
      return result;
    } catch (error) {
      throw new NotFoundException('알림을 조회하지 못했습니다.');
    }
  }

  /** 설정된 스케줄을 완전히 삭제함  */
  async deleteAgenda(id: string, pillBookmarkId: string) {
    const agenda = await this.agenda;
    try {
      await agenda.start();
      await agenda.cancel({
        name: id + '-' + pillBookmarkId,
      });
      await agenda.cancel({ name: id + '-' + pillBookmarkId + ':repeat' });
    } catch (error) {
      throw new NotFoundException('알림을 삭제하지 못했습니다.');
    }
  }
}
