import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaMongoService } from 'src/prisma/prisma-mongo.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlarmsService {
  constructor(
    private prisma: PrismaService,
    private prismaMongo: PrismaMongoService,
  ) {}

  async getAlarms(id: string) {
    try {
      const alarms = await this.prisma.alarm.findMany({
        where: { PillBookMark: { user_id: id } },
        select: {
          PillBookMark: {
            select: {
              User: {
                select: { name: true },
              },
              Pill: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return alarms;
    } catch (error) {
      throw new ForbiddenException('알림을 조회하지 못했습니다.');
    }
  }
}
