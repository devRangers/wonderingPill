import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FcmService {
  constructor(private readonly httpService: HttpService) {}

  async sendPushAlarm() {
    // firebase 연결
  }
}
