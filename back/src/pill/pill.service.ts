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
        )}?serviceKey=${this.configService.get(
          'PILL_KEY',
        )}&itemSeq=${name}&type=json`,
      )
      .toPromise();
    const pill = result.data.body.items.pop();
    const reg = /[<]p[>]|[<][/]p[>]|\n|[<]sub[>]|[<][/]sub[>]/g;
    const [
      title,
      effect,
      sideEffect,
      company,
      usage,
      caution,
      keep,
      cautionContent,
      interactionContent,
    ] = [
      pill.itemName,
      pill.efcyQesitm,
      pill.seQesitm,
      pill.entpName,
      pill.useMethodQesitm,
      pill.atpnWarnQesitm,
      pill.depositMethodQesitm,
      pill.atpnQesitm,
      pill.intrcQesitm,
    ];

    return {
      title,
      effect: effect == null || effect.replace(reg, ''),
      sideEffect: sideEffect == null || sideEffect.replace(reg, ''),
      company,
      usage: usage == null || usage.replace(reg, ''),
      caution: caution == null || caution.replace(reg, ''),
      keep: keep == null || keep.replace(reg, ''),
      cautionContent: cautionContent == null || cautionContent.replace(reg, ''),
      interactionContent:
        interactionContent == null || interactionContent.replace(reg, ''),
    };
  }
}
