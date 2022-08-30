import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { Inquiry, User } from 'prisma/postgresClient';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendInquiryDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async deleteUser(id: string) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new ForbiddenException('회원탈퇴 실패!');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { password, newPassword, name } = updateUserDto;
    const user = await this.authService.getUserById(id);

    try {
      if (password) {
        await this.verifyPassword(user, password);
        const hashedNewPassword = await argon.hash(newPassword);
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            password: hashedNewPassword,
            name: name !== null ? name : undefined,
          },
        });
      }
    } catch (error) {
      throw new ForbiddenException('회원정보를 수정하지 못했습니다.');
    }
  }

  async verifyPassword(user: User, password: string) {
    const check = await argon.verify(user.password, password);
    if (!check) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
  }

  async saveImg(id: string, img: string) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { profileImg: img },
      });
    } catch (error) {
      throw new ForbiddenException('프로필 이미지를 수정하지 못했습니다.');
    }
  }

  async getUserInfo(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          PharmacyBookMark: {
            select: { Pharmacy: { select: { name: true, phone: true } } },
          },
          PillBookMark: {
            select: { Pill: { select: { name: true } }, alarm: true },
          },
        },
      });
      return user;
    } catch (error) {
      throw new ForbiddenException('회원을 검색할 수 없습니다.');
    }
  }

  async sendInquiry(id: string, sendInquiryDto: SendInquiryDto) {
    const { content } = sendInquiryDto;
    const inquiry: Inquiry = await this.prisma.inquiry.create({
      data: { user_id: id, content },
    });
    return inquiry;
  }
}
