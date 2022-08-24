import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FcmService } from 'src/fcm/fcm.service';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlarmsService {
  constructor(
    private prisma: PrismaService,
    private prismaMongo: PrismaMongoService,
    private readonly configService: ConfigService,
    private readonly fcmService: FcmService,
  ) {}

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

  async setReminders() {
    // await this.prismaMongo.user.create({
    //   data: {
    //     fcmToken:
    //     name: ,
    //   },
    // });
    // const agenda = new Agenda({
    //   db: {
    //     address: this.configService.get('DATABASE_URL_MONGO'),
    //     options: { useNewUrlParser: true, useUnifiedTopology: true },
    //   },
    //   name: 'vote deadline queue',
    // });
    // // const agenda = new Agenda({
    // //   db: { address: this.configService.get('DATABASE_URL_MONGO') },
    // // });
    // agenda.define('delete old users', async (job) => {
    //   console.log('Hello!!!');
    //   job.repeatEvery('0 24 15 * * MON,FRI');
    // });
    // (async function () {
    //   // IIFE to give access to async/await
    //   await agenda.start();
    //   await agenda.every('5 seconds', 'delete old users');
    // })();
    // mongodb에 저장
  }
}
