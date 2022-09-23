import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { Inquiry, User } from 'prisma/postgresClient';
import { GcsService } from 'src/gcs/gcs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetMypageResponse,
  GetPresignedUrlResponse,
  SendInquiryDto,
  UpdateUserDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gcsService: GcsService,
  ) {}

  /** 현재 로그인한 유저의 마이페이지 조회 */
  async getMypage(id: string): Promise<GetMypageResponse> {
    try {
      /** 현재 로그인된 user의 mypage에 필요한 bookmark 등 정보를 DB에서 조회 */
      const user: GetMypageResponse = await this.prisma.user.findUnique({
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

      /** DB에 현재 로그인된 user의 정보가 존재하지 않을 경우 에러처리 */
      if (!user) {
        throw new Error();
      }
      return user;
    } catch (error) {
      throw new NotFoundException('회원 정보를 찾지 못했습니다.');
    }
  }

  /** 현재 로그인한 유저의 프로필 이미지 변경을 위해 Presigned Url 발급 요청 */
  async getPresignedUrl(id: string): Promise<GetPresignedUrlResponse> {
    const { url, fileName }: GetPresignedUrlResponse =
      await this.gcsService.getPresignedUrl(id);
    return { url, fileName };
  }

  /** 현재 로그인한 유저의 새로운 프로필 이미지를 DB에 저장하고 GCS의 원래 프로필 이미지 삭제 */
  async updateImg(id: string, img: string) {
    const user: User = await this.getUserById(id);
    const oldDate: string = user.profileImg.split('_')[2];

    await this.updateProfileImg(user.id, img);
    await this.gcsService.deleteImg(oldDate, id);
  }

  /** DB에서 user id로 User 찾기 */
  async getUserById(id: string): Promise<User> {
    try {
      /** DB에서 User 조회 */
      const user: User = await this.prisma.user.findUnique({
        where: { id },
      });

      return user;
    } catch {
      throw new NotFoundException('회원 정보를 찾지 못했습니다.');
    }
  }

  /** user id로 DB에서 User를 찾아 profileImg 변경 */
  async updateProfileImg(id: string, img: string) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { profileImg: img },
      });
    } catch (error) {
      throw new NotFoundException('프로필 이미지를 수정하지 못했습니다.');
    }
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    try {
      await this.prisma.user.update({
        where: { id },
        data: { isDeleted: true, email: user.email + '_' },
      });
    } catch (error) {
      throw new ForbiddenException('회원탈퇴 실패!');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { password, newPassword, name } = updateUserDto;
    const user = await this.getUserById(id);

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

  async sendInquiry(id: string, sendInquiryDto: SendInquiryDto) {
    const { content } = sendInquiryDto;
    const inquiry: Inquiry = await this.prisma.inquiry.create({
      data: { user_id: id, content },
    });
    return inquiry;
  }
}
