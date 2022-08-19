import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessGuard } from 'src/common/guards';
import { MailService } from 'src/mail/mail.service';
import { DeleteUserResponse, SendInquiryDto, SendInquiryResponse } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(`UsersController`);
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  // 마이페이지 프로필 사진 업로드 : 외부 스토리지 gcs 연결
  @Post('upload-profileImg')
  async uploadProfile(@Body() img: string) {
    const user = await this.usersService.uploadProfile(img);
    console.log(user);
  }

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
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async deleteUser(@Param('id') id: string): Promise<DeleteUserResponse> {
    await this.usersService.deleteUser(id);
    this.logger.verbose(`User ${id} delete Success!`);
    return {
      statusCode: 200,
      message: '회원탈퇴가 완료되었습니다.',
      result: { result: true },
    };
  }

  // 고객 센터
  // 관리자 페이지를 추가하면 email 전송 제거
  @Post('send-email')
  async sendEmail(
    @Body() sendInquiryDto: SendInquiryDto,
  ): Promise<SendInquiryResponse> {
    const user: User = await this.authService.getUserById(sendInquiryDto.id);
    const check: boolean = await this.mailService.sendInquiry(
      user.email,
      user.name,
      sendInquiryDto.description,
    );

    this.logger.verbose(`User ${user.email} send inquiry Success!`);

    return {
      statusCode: 200,
      message: '문의를 성공적으로 전송했습니다.',
      result: { check },
    };
  }

  // 알림 여부 추가해야함
  @HttpCode(200)
  @Get('mypage')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '마이페이지 조회 API',
    description: '마이페이지에서 북마크를 조회 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '마이페이지 조회 성공',
    // type: ,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async getUserInfo(@GetCurrentUserId() id: string) {
    const user = await this.usersService.getUserInfo(id);
    if (!user) throw new ForbiddenException('회원 정보를 가져오지 못했습니다.');
    return {
      statusCode: 200,
      message: '마이페이지 조회를 성공했습니다.',
      result: { user },
    };
  }
}
