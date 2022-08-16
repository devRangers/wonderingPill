import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 마이페이지 조회 : 복용약, 관심 약국, 로그인 provider, 갯수, 프로필 사진, 알림 여부
  // 마이페이지 프로필 사진 업로드 : 외부 스토리지 연결
  @Post('upload-profileImg')
  async uploadProfile(@Body() img: string) {
    const user = await this.usersService.uploadProfile(img);
    console.log(user);
  }

  // 고객 센터
  // 회원탈퇴
}
