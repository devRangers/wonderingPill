import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async uploadProfile(img: string) {
    // db에 img 저장
    // gcs에 사진 저장
  }
}
