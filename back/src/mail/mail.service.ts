import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(email: string, name: string) {
    const result = await this.httpService.post(
      `${process.env.MAIL_API_DOMAIN}$/api/v1/mails`,
      {
        senderAddress: process.env.GOOGLE_EMAIL,
        senderName: 'DevRangers',
        title: `[궁금해약] ${name}님 비밀번호를 재설정해주세요.`,
        body:
          `<p>안녕하세요. ${name}님<p>아래의 링크를 통해 비밀번호를 재설정하실 수 있습니다.<p>` +
          `<a href=''></a>` +
          `<p>감사합니다. <p>devRangers 개발팀 드림<p>`,
        recipients: [{ address: email, name, type: 'R' }],
      },
    );
    console.log(result);

    return true;
  }
}
