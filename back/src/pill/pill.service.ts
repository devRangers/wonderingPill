import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PillService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async searchPill(query) {
    const pills = await this.prisma.pill.findMany({});
    return pills;
  }

  async resultPill(name: string) {
    const result = await this.httpService
      .get(
        `${this.configService.get(
          'PILL_DOMAIN',
        )}?serviceKey=${this.configService.get('PILL_KEY')}&itemName=${name}`,
      )
      .toPromise();
    console.log(result);
    return result;
  }
}
