import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  //   async sendSMS() {
  //     const result = await this.httpService.post(
  //       `${this.configService.get('')}`,
  //       {},
  //       {},
  //     );
  //   }
}
