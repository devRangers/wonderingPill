import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserResponse } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(`UsersController`);
  constructor(private readonly usersService: UsersService) {}

  // 마이페이지 프로필 사진 업로드 : 외부 스토리지 연결
  @Post('upload-profileImg')
  async uploadProfile(@Body() img: string) {
    const user = await this.usersService.uploadProfile(img);
    console.log(user);
  }

  // 고객 센터

  @HttpCode(200)
  @Patch('delete-user/:id')
  @ApiOperation({
    summary: '회원탈퇴 API',
    description: '유저를 삭제 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '회원탈퇴 성공',
    type: DeleteUserResponse,
  })
  async deleteUser(@Param('id') id: string): Promise<DeleteUserResponse> {
    await this.usersService.deleteUser(id);
    this.logger.verbose(`User ${id} delete Success!`);
    return {
      statusCode: 200,
      message: '회원탈퇴가 완료되었습니다.',
      result: { result: true },
    };
  }

  // 마이페이지 조회 : 복용약, 관심 약국, 로그인 provider, 갯수, 프로필 사진, 알림 여부
}
