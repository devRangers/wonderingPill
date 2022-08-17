import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { User as UserModel } from '@prisma/client';
import { Response } from 'express';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { CommonResponseDto } from 'src/common/dto';
import {
  AccessGuard,
  GoogleGuard,
  RecaptchaGuard,
  RefreshGuard,
} from 'src/common/guards';
import { MailService } from 'src/mail/mail.service';
import { RedisService } from 'src/redis/redis.service';
import { SmsService } from 'src/sms/sms.service';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  CreateUserResponse,
  FindAccountDto,
  FindAccountResponse,
  FindPasswordDto,
  FindPasswordResponse,
  FindUserResponse,
  LogoutResponse,
  OauthLoginDto,
  SigninResponse,
  SigninUserDto,
} from './dto';
import { Tokens } from './types';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(`AuthController`);
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly smsService: SmsService,
  ) {}

  @Public()
  @HttpCode(200)
  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: '유저 생성(회원가입) API',
    description: '유저를 생성한다.',
  })
  @ApiResponse({
    status: 200,
    description: '회원가입 성공',
    type: CreateUserResponse,
  })
  @ApiBody({ type: CreateUserDto })
  async signupUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const user: UserModel = await this.authService.createUser(createUserDto);
    this.logger.verbose(`User ${user.email} Sign-Up Success!`);
    return {
      statusCode: 200,
      message: '회원가입에 성공했습니다.',
      user: { id: user.id, email: user.email },
    };
  }

  @Public()
  @HttpCode(200)
  @Post('signin')
  @Throttle(5, 1)
  @UseGuards(RecaptchaGuard)
  @ApiOperation({
    summary: '유저 로그인 API',
    description:
      '유저의 accessToken, refreshToken을 발행하여 cookie에 저장하고 로그인한다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: SigninResponse,
  })
  @ApiBody({ type: SigninUserDto })
  async signinUser(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SigninResponse> {
    const user: UserModel = await this.authService.getUserByEmail(
      signinUserDto.email,
    );
    const { accessToken, refreshToken }: Tokens =
      await this.authService.localSignin(signinUserDto, user);

    // redis: save refresh-token
    await this.authService.saveRefreshToken(
      user.id,
      signinUserDto.isSignin,
      refreshToken,
    );

    // cookie에 accessToken, refreshToken 저장
    res.cookie('AccessToken', accessToken, {
      maxAge: this.configService.get('JWT_EXPIRESIN'),
      httpOnly: true,
      // secure:true
    });

    let maxAge;
    if (signinUserDto.isSignin) {
      maxAge = this.configService.get('JWT_REFRESH_EXPIRESIN_AUTOSAVE');
    } else {
      maxAge = this.configService.get('JWT_REFRESH_EXPIRESIN');
    }
    res.cookie('RefreshToken', refreshToken, {
      maxAge,
      httpOnly: true,
      // secure:true
    });

    this.logger.verbose(`User ${signinUserDto.email} Sign-In Success!`);

    return {
      statusCode: 200,
      message: '정상적으로 로그인되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
        provider: user.provider,
      },
    };
  }

  @Public()
  @HttpCode(200)
  @Get('refresh')
  @UseGuards(RefreshGuard)
  @ApiOperation({
    summary: 'accessToken 재발행 API',
    description: 'refreshToken이 만료되지 않았다면 accessToken을 재발행한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Access Token 발행 성공',
    type: CommonResponseDto,
  })
  @ApiCookieAuth('accessToken')
  @ApiCookieAuth('refreshToken')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUserId() id: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<CommonResponseDto> {
    const accessToken: string = await this.authService.updateAccessToken(
      id,
      refreshToken,
    );

    res.cookie('AccessToken', accessToken, {
      maxAge: this.configService.get('JWT_EXPIRESIN'),
      httpOnly: true,
      // secure:true
    });

    let message;
    if (accessToken) {
      message = '정상적으로 access token이 발행되었습니다.';
    } else {
      message = '로그인이 유지되지 않습니다.';
    }
    this.logger.verbose(`User ${id} keep login Success!`);
    return {
      statusCode: 200,
      message,
    };
  }

  @Get('logout')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '로그아웃 API',
    description: 'refreshToken과 accessToken을 삭제하고 로그아웃한다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
    type: LogoutResponse,
  })
  @ApiCookieAuth('refreshToken')
  @ApiCookieAuth('accessToken')
  async logout(
    @GetCurrentUserId() id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogoutResponse> {
    const checkLogout: boolean = await this.authService.logout(id);

    let message;
    if (checkLogout) {
      res.clearCookie('AccessToken');
      res.clearCookie('RefreshToken');

      message = '로그아웃이 완료되었습니다.';
    } else {
      message = '로그아웃에 실패하였습니다.';
    }
    this.logger.verbose(`User ${id} logout Success!`);
    return {
      statusCode: 200,
      message,
      checkLogout: { checkLogout },
    };
  }

  @Get('current')
  @UseGuards(AccessGuard)
  @ApiOperation({
    summary: '현재 로그인 API',
    description: '현재 로그인되어있는 유저를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '현재 로그인 유저 조회 성공',
    type: SigninResponse,
  })
  @ApiCookieAuth('refreshToken')
  @ApiCookieAuth('accessToken')
  async current(@GetCurrentUserId() id: string): Promise<SigninResponse> {
    const user: UserModel = await this.authService.getUserById(id);
    this.logger.verbose(`Call Current User ${id} Success!`);
    return {
      statusCode: 200,
      message: '현재 로그인 유저 조회에 성공했습니다.',
      user: {
        id,
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
        provider: user.provider,
      },
    };
  }

  @HttpCode(200)
  @Post('send-email')
  @Throttle(5, 360)
  @UseGuards(RecaptchaGuard)
  @ApiOperation({
    summary: '비밀번호 찾기 email 전송 요청 API',
    description: '비밀번호 찾기를 위해 email을 전송 한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'email 전송 성공',
    type: FindPasswordResponse,
  })
  @ApiBody({ type: FindPasswordDto })
  async sendEmail(
    @Body() findPasswordDto: FindPasswordDto,
  ): Promise<FindPasswordResponse> {
    const user: UserModel = await this.authService.findUser(findPasswordDto);
    await this.authService.setPWChangeToken(user.id);
    const result: boolean = await this.mailService.sendEmail(
      user.email,
      user.name,
    );
    this.logger.verbose(`User ${user.email} send email to update Success!`);
    return {
      statusCode: 200,
      message: '이메일을 성공적으로 전송했습니다.',
      result: { result },
    };
  }

  @HttpCode(200)
  @ApiOperation({
    summary: '비밀번호 변경 토큰 유효 검사 API',
    description: '비밀번호 변경 토큰이 유효한지 검사 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '토큰 검사 성공',
    type: FindPasswordResponse,
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: '이메일',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: '이메일',
  })
  @Get('change-password/check')
  async checkPWToken(
    @Param('email') email: string,
  ): Promise<FindPasswordResponse> {
    const user: UserModel = await this.authService.getUserByEmail(email);
    await this.redisService.getKey('pw' + user.id);
    this.logger.verbose(`User ${user.email} check pw token Success!`);
    return {
      statusCode: 200,
      message: '토큰의 유효기간이 만료되지 않았습니다.',
      result: { result: true },
    };
  }

  @HttpCode(200)
  @Put('change-password')
  @ApiOperation({
    summary: '비밀번호 변경 API',
    description: '비밀번호를 변경 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '비밀번호 변경 성공',
    type: CommonResponseDto,
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: '이메일',
  })
  @ApiBody({ type: ChangePasswordDto })
  async changePassword(
    @Param('email') email: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<CommonResponseDto> {
    await this.authService.changePassword(email, changePasswordDto);
    this.logger.verbose(`User ${email} update password Success!`);
    return {
      statusCode: 200,
      message: '비밀번호가 변경되었습니다.',
    };
  }

  @HttpCode(200)
  @Get('google')
  @Throttle(5, 1)
  @ApiOperation({
    summary: 'google 로그인 API',
    description: 'google 로그인을 요청 한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'google 로그인 요청 성공',
  })
  @UseGuards(GoogleGuard)
  async google() {
    return HttpStatus.OK;
  }

  @UseGuards(GoogleGuard)
  @Get('google-redirect')
  @Redirect(`${process.env.CLIENT_URL}/login`, 403)
  async googleLogin(@Req() req, @Res({ passthrough: true }) res) {
    const { accessToken, refreshToken }: Tokens =
      await this.authService.googleLogin(req.user as OauthLoginDto, res);

    res.cookie('AccessToken', accessToken, {
      maxAge: this.configService.get('JWT_EXPIRESIN'),
      httpOnly: true,
      // secure:true
    });
    res.cookie('RefreshToken', refreshToken, {
      maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
      httpOnly: true,
      // secure:true
    });

    res.redirect(`${process.env.CLIENT_URL}/`);
    res.end();
  }

  @HttpCode(200)
  @Throttle(5, 360)
  @UseGuards(RecaptchaGuard)
  @Post('send-sms')
  @ApiOperation({
    summary: '계정 찾기 / 회원가입의 휴대폰 본인인증 API',
    description:
      '계정 찾기 / 회원가입에서 휴대폰 SMS 인증번호로 본인인증 한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'SMS 전송 성공',
    type: CommonResponseDto,
  })
  @ApiBody({ type: FindAccountDto })
  async sendSMS(
    @Body() findAccountDto: FindAccountDto,
  ): Promise<CommonResponseDto> {
    const number = Math.floor(Math.random() * 1000000);
    const verifyCode: string = number.toString().padStart(6, '0');

    await this.redisService.setKey(
      'sms' + findAccountDto.phone,
      verifyCode,
      300,
    );

    await this.smsService.sendSMSByTwilio(findAccountDto.phone, verifyCode);

    this.logger.verbose(`User ${findAccountDto.phone} send sms Success!`);
    return {
      statusCode: 200,
      message: 'SMS을 성공적으로 전송했습니다.',
    };
  }

  @HttpCode(200)
  @Get('verify-code')
  @ApiOperation({
    summary: '인증번호 확인 API',
    description: '인증번호가 일치하는지 확인 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '인증번호 확인 성공',
    type: FindUserResponse,
  })
  @ApiQuery({
    name: 'code',
    required: true,
    description: '인증번호',
  })
  @ApiQuery({
    name: 'phone',
    required: true,
    description: '전화번호',
  })
  async verifyCode(@Query() query): Promise<FindUserResponse> {
    const { phone, code } = query;

    const saveCode = await this.redisService.getKey('sms' + phone);

    if (saveCode !== code) {
      throw new ForbiddenException('인증번호가 일치하지 않습니다.');
    } else {
      const user: UserModel = await this.authService.getUserByPhone(phone);
      this.logger.verbose(`User ${user.phone} verify code Success!`);
      return {
        statusCode: 200,
        message: '인증번호가 일치합니다.',
        user: { id: user.id },
      };
    }
  }

  @HttpCode(200)
  @ApiParam({
    name: 'phone',
    required: true,
    description: '전화번호',
  })
  @ApiOperation({
    summary: '계정 찾기 API',
    description: '계정을 찾는다.',
  })
  @ApiResponse({
    status: 200,
    description: '계정 찾기 성공',
    type: FindAccountResponse,
  })
  @Get('find-account')
  async getAccount(
    @Param('phone') phone: string,
  ): Promise<FindAccountResponse> {
    const user: UserModel = await this.authService.getUserByPhone(phone);

    let name;
    let email;

    if (!user) {
      name = '';
      email = '';
    } else {
      name = user.name;
      email = user.email;
    }

    return {
      statusCode: 200,
      message: '계정을 찾았습니다.',
      user: { name, email },
    };
  }

  // @HttpCode(200)
  // @Throttle(5, 1)
  // @Get('kakao')
  // @ApiOperation({
  //   summary: 'kakao 로그인 API',
  //   description: 'kakao 로그인을 요청 한다.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'kakao 로그인 요청 성공',
  // })
  // @ApiBody({})
  // @UseGuards(KakaoGuard)
  // async callKakao() {
  //   return HttpStatus.OK;
  // }

  // @UseGuards(KakaoGuard)
  // @Get('kakao-redirect')
  // async kakaoLogin(@Req() req, @Res({ passthrough: true }) res) {
  //   const { accessToken, refreshToken }: Tokens =
  //     await this.authService.kakaoLogin(req.user as OauthLoginDto);

  //   res.cookie('AccessToken', accessToken, {
  //     maxAge: this.configService.get('JWT_EXPIRESIN'),
  //     httpOnly: true,
  //     // secure:true
  //   });
  //   res.cookie('RefreshToken', refreshToken, {
  //     maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
  //     httpOnly: true,
  //     // secure:true
  //   });

  //   res.redirect(`${process.env.CLIENT_URL}/`);
  //   res.end();
  // }
}
