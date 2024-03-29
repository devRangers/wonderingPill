import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PillService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async bookmarkPill(id: string, pill_id: number) {
    const pill = await this.checkBookmark(id, pill_id);
    // 알림 삭제 필요
    try {
      let pills;
      if (pill.length === 0) {
        pills = await this.prisma.pillBookMark.create({
          data: { user_id: id, pill_id },
        });
      } else {
        pills = await this.prisma.pillBookMark.deleteMany({
          where: { user_id: id, pill_id },
        });
      }

      return pills;
    } catch (error) {
      throw new NotFoundException('북마크를 변경하지 못했습니다.');
    }
  }

  async checkBookmark(id: string, pill_id: number) {
    try {
      const pill = await this.prisma.pillBookMark.findMany({
        where: { user_id: id, pill_id },
      });

      return pill;
    } catch (error) {
      throw new NotFoundException('북마크를 조회하지 못했습니다.');
    }
  }

  async searchPill({ query }) {
    try {
      const pills = await this.prisma.pill.findMany({
        where: {
          AND: [
            { shape: { contains: query.shape } },
            { colors: { contains: query.colors } },
            { mark: Number(query.mark) },
            { letters: { contains: query.letters } },
            { name: { contains: query.name } },
          ],
        },
        select: {
          id: true,
          name: true,
          code: true,
          PillBookMark: { select: { user_id: true } },
        },
      });

      return pills;
    } catch (error) {
      throw new NotFoundException('검색을 하지 못했습니다.');
    }
  }

  async resultPill(name: string) {
    try {
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
        cautionContent:
          cautionContent == null || cautionContent.replace(reg, ''),
        interactionContent:
          interactionContent == null || interactionContent.replace(reg, ''),
      };
    } catch (error) {
      throw new NotFoundException('알약 검색 결과를 불러오지 못했습니다.');
    }
  }
}
