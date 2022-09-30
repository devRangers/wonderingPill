import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agenda } from 'agenda/es';
import { FcmService } from 'src/fcm/fcm.service';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';

@Injectable()
export class AgendaService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fcmService: FcmService,
    private readonly prismaMongo: PrismaMongoService,
  ) {}

  /** Agneda 설정 */
  async setAgenda(id: string, pillBookmarkId: string): Promise<Agenda> {
    const agenda = new Agenda({
      db: {
        address: this.configService.get('DATABASE_URL_MONGO'),
        collection: 'pillAlarms',
      },
      name: id + '-' + pillBookmarkId,
    });
    return agenda;
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
    const agenda: Agenda = await this.setAgenda(id, pillBookmarkId);
    const time: string = await this.getCurrTime();

    try {
      agenda.define(id + '-' + pillBookmarkId, async () => {
        await this.fcmService.sendPushAlarm(deviceToken, userName, pillName); // 알림 전송
        await this.prismaMongo.reminder.create({
          data: {
            user_id: id,
            user_name: userName,
            pill_name: pillName,
            time,
          },
        }); // 알림 전송 기록

        // 반복 시간 설정
        if (repeatTime !== 0) {
          await this.setRepeatAgenda(repeatTime, id, pillBookmarkId);
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
  async getCurrTime() {
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
  ) {
    const agenda = await this.setAgenda(id, pillBookmarkId);
    try {
      (async function () {
        const job = agenda.create(id + '-' + pillBookmarkId + ':repeat');
        await agenda.start();
        await job.schedule(`in ${repeatTime} minutes`).save();
      })();
    } catch (error) {
      throw new NotFoundException('반복 스케줄을 설정하지 못했습니다.');
    }
  }

  async setEveryAgenda(
    minute: number,
    hour: number,
    vip: number[],
    repeatTime: number,
    id: string,
    pillBookmarkId: string,
  ) {
    const agenda = await this.setAgenda(id, pillBookmarkId);
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

  async getAgenda(id, pillBookmarkId, pillName) {
    const agenda = await this.setAgenda(id, pillBookmarkId);
    try {
      const result = (async function () {
        await agenda.start();
        const job = await agenda.jobs({ name: id + '-' + pillBookmarkId });
        if (job.length === 0) {
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

  async deleteAgenda(id: string, pillBookmarkId: string) {
    const agenda = await this.setAgenda(id, pillBookmarkId);
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