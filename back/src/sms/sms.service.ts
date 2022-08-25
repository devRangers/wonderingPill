import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class SmsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly mailService: MailService,
  ) {}

  async sendSMS(phone: string, verifyCode: string) {
    const smsUrl = '/sms/v2/services';

    try {
      await this.httpService
        .post(
          `${this.configService.get(
            'SMS_DOMAIN',
          )}${smsUrl}/${this.configService.get('SMS_SERVICE_ID')}/messages`,
          {
            type: 'SMS',
            contentType: 'COMM',
            countryCode: '82',
            from: this.configService.get('SENDER_PHONE').toString(),
            content: `인증번호입니다. [${verifyCode}]`,
            messages: [
              {
                to: phone,
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'x-ncp-apigw-timestamp': new Date().getTime().toString(10),
              'x-ncp-iam-access-key': this.configService.get('ACCESS_KEY_ID'),
              'x-ncp-apigw-signature-v2': this.mailService.makeSign(
                'POST',
                `${smsUrl}/${this.configService.get(
                  'SMS_SERVICE_ID',
                )}/messages`,
                new Date().getTime().toString(10),
                this.configService.get('ACCESS_KEY_ID'),
                this.configService.get('SECRET_KEY'),
              ),
            },
          },
        )
        .toPromise();
      return true;
    } catch (error) {
      throw new ForbiddenException('SMS 전송을 실패하였습니다.');
    }
  }

  // async sendSMSByTwilio(phone: string, verifyCode: string): Promise<boolean> {
  //   try {
  //     const result = await this.twilioService.client.messages.create({
  //       body: `[궁금해약] 인증번호입니다.[${verifyCode}]`,
  //       from: this.configService.get('SMS_PHONE_NUMBER'),
  //       to: '+82' + phone,
  //     });

  //     if (result.errorCode !== null) {
  //       throw new ForbiddenException('SMS 전송에 문제가 생겼습니다.');
  //     }

  //     return true;
  //   } catch (error) {
  //     throw new ForbiddenException('SMS 전송에 문제가 생겼습니다.');
  //   }
  // }
}
