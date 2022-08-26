import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PillService {
  constructor(private prisma: PrismaService) {}

  async searchPill(query) {
    const pills = await this.prisma.pill.findMany({});
    return pills;
  }
}
