import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async uploadProfile(img: string) {
    // db에 img 저장
    // gcs에 사진 저장
  }

  async deleteUser(id: string): Promise<User> {
    console.log(id);
    const user: User = await this.prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });

    if (!user) {
      throw new ForbiddenException('회원탈퇴를 실패했습니다.');
    }

    return user;
  }
}
