import { ForbiddenException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FcmService {
  async sendPushAlarm(deviceToken: string) {
    const name = '';
    const pill = '루테인';

    const message = {
      notification: {
        title: '[궁금해약] 복용 알림',
        body: `${name}님! ${pill} 약을 먹을 시간입니다!`,
      },
      data: {
        score: '850',
        time: '',
      },
      webpush: {
        headers: {
          image:
            'https://storage.cloud.google.com/wonderingpill-bucket/%EA%B6%81%EA%B8%88%ED%95%B4%EC%95%BD.png',
        },
        fcmOptions: {
          link: '',
        },
      },
      token: deviceToken,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch(() => {
        throw new ForbiddenException('push 알림 예약을 실패했습니다.');
      });
  }
}
