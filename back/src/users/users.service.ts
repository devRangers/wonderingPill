import { ForbiddenException, Injectable } from '@nestjs/common';
import { Inquiry } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendInquiryDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  async getUserInfo(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          PharmacyBookMark: {
            select: { Pharmacy: { select: { name: true, phone: true } } },
          },
          PillBookMark: { select: { Pill: { select: { name: true } } } },
        },
      });
      return user;
    } catch (error) {
      throw new ForbiddenException('회원을 검색할 수 없습니다.');
    }
  }

  async sendInquiry(sendInquiryDto: SendInquiryDto) {
    const { id, content } = sendInquiryDto;
    const inquiry: Inquiry = await this.prisma.inquiry.create({
      data: { user_id: id, content },
    });
    return inquiry;
  }
}
