import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendSMS(phone: string, verifyCode: string) {
    const result = await this.httpService
      .post(
        `${this.configService.get('SMS_API_DOMAIN')}/${this.configService.get(
          'ACCESS_KEY_ID',
        )}/messages`,
        {
          type: 'SMS',
          contentType: 'COMM',
          countryCode: '1',
          from: this.configService.get('SENDER_PHONE'),
          content: `인증번호입니다. [${verifyCode}]`,
          message: [
            {
              to: phone,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': Date.now().toString(),
            'x-ncp-iam-access-key': this.configService.get('ACCESS_KEY_ID'),
            'x-ncp-apigw-signature-v2': this.makeSign(
              'POST',
              `/sms/v2/services/${this.configService.get(
                'SMS_API_DOMAIN',
              )}/messages`,
              new Date().getTime().toString(10),
              this.configService.get('ACCESS_KEY_ID'),
              this.configService.get('SECRET_KEY'),
            ),
          },
        },
      )
      .toPromise();
    console.log(result);
    if (!result || !result.data || result.data.count !== 1) {
      throw new ForbiddenException('SMS 전송을 실패하였습니다.');
    }
    return true;
  }

  makeSign(
    method: string,
    url: string,
    timestamp: string,
    accessKey: string,
    secretKey: string,
  ): string {
    const space = ' ';
    const newLine = '\n';
    const message = [];
    const hmac = createHmac('sha256', secretKey);

    message.push(method);
    message.push(space);
    message.push(url);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(accessKey);

    const sign = hmac.update(message.join('')).digest('base64');

    if (!sign) throw new ForbiddenException('서명을 생성하지 못했습니다.');
    console.log(sign.toString());
    return sign.toString();
  }
}
