import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class SmsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly twilioService: TwilioService,
  ) {}

  async sendSMSByTwilio(phone: string, verifyCode: string): Promise<boolean> {
    const result = await this.twilioService.client.messages.create({
      body: `[궁금해약] 인증번호입니다.[${verifyCode}]`,
      from: this.configService.get('SMS_PHONE_NUMBER'),
      to: '+82' + phone,
    });

    if (result.errorCode !== null) {
      throw new ForbiddenException('SMS 전송에 문제가 생겼습니다.');
    }

    return true;
  }
}
