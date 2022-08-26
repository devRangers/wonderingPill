import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Inquiry } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { CommonResponseDto } from 'src/common/dto';
import { AccessGuard } from 'src/common/guards';
import { GcsService } from 'src/gcs/gcs.service';
import { MailService } from 'src/mail/mail.service';
import {
  DeleteUserResponse,
  getSignedUrlResponse,
  getUserResponse,
  SendInquiryDto,
  SendInquiryResponse,
  UpdateUserDto,
} from './dto';
import { UsersService } from './users.service';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(`UsersController`);
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly gcsService: GcsService,
  ) {}

  @HttpCode(200)
  @Get('presigned-url')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: 'signed url 요청 API',
    description: '외부 스토리지 GCS에서 signed url 발급한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'signed url 요청 성공',
    type: getSignedUrlResponse,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async getPresignedUrl(
    @GetCurrentUserId() id: string,
  ): Promise<getSignedUrlResponse> {
    const { url, fileName } = await this.gcsService.getPresignedUrl(id);
    this.logger.verbose(`get user profileImg signed url Success!`);
    return {
      statusCode: 200,
      message: 'signed url를 발급했습니다.',
      result: { url, fileName },
    };
  }

  @HttpCode(200)
  @Patch('save-profileImg')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '프로필 이미지 수정 API',
    description: '프로필 이미지를 수정한다.',
  })
  @ApiResponse({
    status: 200,
    description: '프로필 이미지 수정 성공',
    type: CommonResponseDto,
  })
  @ApiQuery({
    name: 'img',
    required: true,
    description: '유저 프로필 이미지',
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async saveProfileImg(
    @GetCurrentUserId() id: string,
    @Query('img') img: string,
  ) {
    await this.usersService.saveImg(id, img);
    return {
      statusCode: 200,
      message: '프로필 이미지를 수정했습니다.',
    };
  }

  @HttpCode(200)
  @Patch('delete-user')
  @UseGuards(AccessGuard)
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
  async deleteUser(
    @GetCurrentUserId() id: string,
  ): Promise<DeleteUserResponse> {
    await this.usersService.deleteUser(id);
    this.logger.verbose(`User ${id} delete Success!`);
    return {
      statusCode: 200,
      message: '회원탈퇴가 완료되었습니다.',
      result: { result: true },
    };
  }

  @HttpCode(200)
  @Patch('update-user')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '회원 정보 수정 API',
    description: '회원 정보를 수정 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '회원 정보 수정 성공',
    type: CommonResponseDto,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async UpdateUser(
    @GetCurrentUserId() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<CommonResponseDto> {
    await this.usersService.updateUser(id, updateUserDto);
    this.logger.verbose(`User ${id} update Success!`);
    return {
      statusCode: 200,
      message: '회원 정보가 수정되었습니다.',
    };
  }

  // 알림 여부 추가해야함
  @HttpCode(200)
  @Get('mypage')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '마이페이지 조회 API',
    description: '마이페이지에서 북마크를 조회 한다(알림 추가되어야함)',
  })
  @ApiResponse({
    status: 200,
    description: '마이페이지 조회 성공',
    type: getUserResponse,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async getUserInfo(@GetCurrentUserId() id: string): Promise<getUserResponse> {
    const user = await this.usersService.getUserInfo(id);
    if (!user) throw new ForbiddenException('회원 정보를 가져오지 못했습니다.');

    this.logger.verbose(`get user mypage info Success!`);
    return {
      statusCode: 200,
      message: '마이페이지 조회를 성공했습니다.',
      result: { user },
    };
  }

  // 고객 센터
  // 관리자 페이지를 추가하면 email 전송 제거
  @HttpCode(200)
  @Post('send-inquiry')
  @ApiOperation({
    summary: '고객센터 API',
    description:
      '고객이 문의한 내용을 이메일로 전송 한다(API 수정 필요 : 관리자 페이지)',
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async sendInquiry(
    @Body() sendInquiryDto: SendInquiryDto,
  ): Promise<SendInquiryResponse> {
    // const user: User = await this.authService.getUserById(sendInquiryDto.id);
    // const check: boolean = await this.mailService.sendInquiry(
    //   user.email,
    //   user.name,
    //   sendInquiryDto.description,
    // );

    const inquiry: Inquiry = await this.usersService.sendInquiry(
      sendInquiryDto,
    );

    this.logger.verbose(`User send inquiry Success!`);

    return {
      statusCode: 200,
      message: '문의를 성공적으로 전송했습니다.',
      result: { inquiry },
    };
  }
}
