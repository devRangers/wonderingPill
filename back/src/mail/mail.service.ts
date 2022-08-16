import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class MailService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(
    email: string,
    name: string,
    token: string,
  ): Promise<boolean> {
    const mailUrl = '/api/v1/mails';
    const result = await this.httpService
      .post(
        `${this.configService.get('MAIL_API_DOMAIN')}${mailUrl}`,
        {
          senderAddress: this.configService.get('SENDER_ADDRESS'),
          senderName: 'DevRangers',
          title: `[궁금해약] ${name} 님 비밀번호를 재설정해주세요.`,
          body:
            `<p>안녕하세요. ${name} 님<p>아래의 링크를 통해 비밀번호를 재설정하실 수 있습니다.<p>` +
            `<a href='${this.configService.get(
              'CLIENT_URL',
            )}/account/password/new?email=${email}&token=${token}'>비밀번호 재설정하기</a>` +
            `<p>감사합니다. <p>devRangers 개발팀 드림<p>`,
          recipients: [{ address: email, name, type: 'R' }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-apigw-timestamp': new Date().getTime().toString(10),
            'x-ncp-iam-access-key': this.configService.get('ACCESS_KEY_ID'),
            'x-ncp-apigw-signature-v2': this.makeSign(
              'POST',
              mailUrl,
              new Date().getTime().toString(10),
              this.configService.get('ACCESS_KEY_ID'),
              this.configService.get('SECRET_KEY'),
            ),
            'x-ncp-lang': 'ko-KR',
          },
        },
      )
      .toPromise();

    if (!result || !result.data || result.data.count !== 1) {
      throw new ForbiddenException('이메일 전송을 실패하였습니다.');
    }
    return true;
  }

  async sendInquiry(
    email: string,
    name: string,
    description: string,
  ): Promise<boolean> {
    const mailUrl = '/api/v1/mails';
    const result = await this.httpService
      .post(
        `${this.configService.get('MAIL_API_DOMAIN')}${mailUrl}`,
        {
          senderAddress: email,
          senderName: name,
          title: `[궁금해약] ${name} 님의 고객센터 문의입니다.`,
          body: `<p> 문의 내용 : ${description}</p>`,
          recipients: [
            {
              address: this.configService.get('SENDER_ADDRESS'),
              name: 'DevRangers',
              type: 'R',
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-apigw-timestamp': new Date().getTime().toString(10),
            'x-ncp-iam-access-key': this.configService.get('ACCESS_KEY_ID'),
            'x-ncp-apigw-signature-v2': this.makeSign(
              'POST',
              mailUrl,
              new Date().getTime().toString(10),
              this.configService.get('ACCESS_KEY_ID'),
              this.configService.get('SECRET_KEY'),
            ),
            'x-ncp-lang': 'ko-KR',
          },
        },
      )
      .toPromise();

    if (!result || !result.data || result.data.count !== 1) {
      throw new ForbiddenException('이메일 전송을 실패하였습니다.');
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

    const hmac = createHmac('sha256', secretKey);

    hmac.write(method);
    hmac.write(space);
    hmac.write(url);
    hmac.write(newLine);
    hmac.write(timestamp);
    hmac.write(newLine);
    hmac.write(accessKey);
    hmac.end();

    if (!hmac) throw new ForbiddenException('서명을 생성하지 못했습니다.');

    return Buffer.from(hmac.read()).toString('base64');
  }
}
