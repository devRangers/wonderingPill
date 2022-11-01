import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBody,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { User } from 'prisma/postgresClient';
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
import { MailService } from 'src/infras/mail/mail.service';
import { RedisService } from 'src/infras/redis/redis.service';
import { SmsService } from 'src/infras/sms/sms.service';
import { UsersService } from 'src/users/users.service';
import { prefixConstant } from 'src/utils/prefix.constant';
import { v4 as uuid } from 'uuid';
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
  private readonly logger = new Logger(`${prefixConstant}/auth`);
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly smsService: SmsService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(201)
  @Post('signup')
  @ApiOperation({
    summary: '유저 생성(회원가입) API',
    description: '유저를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: CreateUserResponse,
  })
  @ApiBody({ type: CreateUserDto })
  async signupUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const user: User = await this.authService.createUser(createUserDto);
    this.logger.log(`POST /signup Success!`);
    return {
      statusCode: 201,
      message: '회원가입에 성공했습니다.',
      user: { id: user.id, email: user.email },
    };
  }

  @HttpCode(200)
  @Get('signup/check/:email')
  @ApiOperation({
    summary: '회원가입시 회원 검사 API',
    description: '회원가입시 회원이 존재하는지, 탈퇴한 이력이 있는지 조사한다.',
  })
  @ApiResponse({
    status: 200,
    description: '회원가입시 회원 검사 성공',
    type: CommonResponseDto,
  })
  @ApiNotAcceptableResponse({
    status: 406,
    description: '이미 존재하는 회원입니다.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: '탈퇴한 이력이 존재하는 회원입니다.',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: '유저 이메일',
  })
  async checkUser(@Param('email') email: string): Promise<CommonResponseDto> {
    const user: User = await this.authService.getUserByEmail(email);
    if (user) {
      throw new NotAcceptableException('이미 존재하는 회원입니다.');
    }

    const deletedUser: User = await this.authService.getUserByEmail(
      email + '_',
    );
    if (deletedUser) {
      throw new ForbiddenException('탈퇴한 이력이 존재하는 회원입니다.');
    }

    this.logger.log(`GET /signup/check/:email Success!`);
    return {
      statusCode: 200,
      message: '회원 검사를 성공했습니다.',
    };
  }

  @HttpCode(200)
  @Put('signup/restore/:email')
  @ApiOperation({
    summary: '계정 복원 API',
    description: '탈퇴한 계정을 다시 복원한다.',
  })
  @ApiResponse({
    status: 200,
    description: '계정 복원 성공',
    type: CommonResponseDto,
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: '유저 이메일',
  })
  async restoreUser(@Param('email') email: string): Promise<CommonResponseDto> {
    await this.authService.restoreUser(email);
    this.logger.log(`PUT /signup/restore/:email Success!`);
    return {
      statusCode: 200,
      message: '회원을 복원했습니다.',
    };
  }

  @HttpCode(201)
  @Post('signup/send-email')
  @Throttle(5, 360)
  @ApiOperation({
    summary: '회원가입시 이메일 전송 API',
    description: '회원가입시 이메일 인증을 위해 이메일을 전송 한다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입시 이메일 전송 성공',
    type: FindPasswordResponse,
  })
  @ApiBody({ type: FindPasswordDto })
  async sendEmailForSignup(
    @Body() findPasswordDto: FindPasswordDto,
  ): Promise<FindPasswordResponse> {
    const user: User = await this.authService.getUserByEmail(
      findPasswordDto.email,
    );

    const emailToken: string = uuid().toString();

    try {
      await this.redisService.setKey(
        'auth-email' + user.id,
        this.configService.get('AUTH_EMAIL_KEY') + emailToken,
        Number(this.configService.get('AUTH_EMAIL_TTL')),
      );
    } catch (error) {
      throw new NotFoundException('토큰을 저장하지 못했습니다.');
    }

    const check: boolean = await this.mailService.sendEmail(
      user.id,
      user.name,
      emailToken,
      'auth-email',
    );

    this.logger.log(`POST /signup/send-email Success!`);
    return {
      statusCode: 201,
      message: '이메일을 성공적으로 전송했습니다.',
      result: { check },
    };
  }

  @HttpCode(200)
  @Get('/signup/token')
  @ApiOperation({
    summary: '비밀번호 변경 토큰 유효 검사 API',
    description: '비밀번호 변경 토큰이 유효한지 검사 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '토큰 검사 성공',
    type: FindPasswordResponse,
  })
  @ApiQuery({
    name: 'email',
    required: true,
    description: '유저 이메일',
  })
  @ApiQuery({
    name: 'token',
    required: true,
    description: '이메일 인증 토큰',
  })
  async checkTokenForSignup(@Query() query): Promise<FindPasswordResponse> {
    const token: string = await this.redisService.getKey(
      'auth-email' + query.id,
    );

    if (
      query.token !==
      token.slice(this.configService.get('AUTH_EMAIL_TTL').length)
    ) {
      throw new ForbiddenException('토큰이 일치하지 않습니다.');
    }

    this.logger.log(`GET /signup/token Success!`);
    return {
      statusCode: 200,
      message: '토큰의 유효기간이 만료되지 않았습니다.',
      result: { check: true },
    };
  }

  @HttpCode(201)
  @Post('signin')
  @Throttle(5, 1)
  @UseGuards(RecaptchaGuard)
  @ApiOperation({
    summary: '유저 로그인 API',
    description:
      '유저의 accessToken, refreshToken을 발행하여 cookie에 저장하고 로그인한다.',
  })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: SigninResponse,
  })
  @ApiBody({ type: SigninUserDto })
  async signinUser(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SigninResponse> {
    const user: User = await this.authService.getUserByEmail(
      signinUserDto.email,
    );

    if (!user) throw new ForbiddenException('회원이 존재하지 않습니다.');

    const { accessToken, refreshToken }: Tokens =
      await this.authService.localSignin(signinUserDto, user);

    await this.authService.saveRefreshToken(
      user.id,
      signinUserDto.isSignin,
      refreshToken,
    );

    try {
      res.cookie('AccessToken', accessToken, {
        maxAge: this.configService.get('JWT_EXPIRESIN'),
        httpOnly: true,
        secure:
          this.configService.get('NODE_ENV') === 'production' ? true : false,
      });

      res.cookie('RefreshToken', refreshToken, {
        maxAge:
          signinUserDto.isSignin === true
            ? this.configService.get('JWT_REFRESH_EXPIRESIN_AUTOSAVE')
            : this.configService.get('JWT_REFRESH_EXPIRESIN'),
        httpOnly: true,
        secure:
          this.configService.get('NODE_ENV') === 'production' ? true : false,
      });
    } catch (error) {
      throw new ForbiddenException('Cookie Failed!');
    }

    this.logger.log(`POST /signin Success!`);
    return {
      statusCode: 201,
      message: '정상적으로 로그인되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
        provider: user.provider,
        phone: user.phone,
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

    try {
      res.cookie('AccessToken', accessToken, {
        maxAge: this.configService.get('JWT_EXPIRESIN'),
        httpOnly: true,
        secure:
          this.configService.get('NODE_ENV') === 'production' ? true : false,
      });
    } catch (error) {
      throw new ForbiddenException('Cookie Failed!');
    }

    this.logger.log(`GET /refresh Success!`);
    return {
      statusCode: 200,
      message: '정상적으로 access token이 발행되었습니다.',
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

    try {
      if (checkLogout) {
        res.clearCookie('AccessToken');
        res.clearCookie('RefreshToken');
      }
    } catch (error) {
      throw new ForbiddenException('Cookie Failed!');
    }

    this.logger.log(`GET /logout Success!`);
    return {
      statusCode: 200,
      message: '로그아웃이 완료되었습니다.',
      result: { checkLogout },
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
    const user: User = await this.usersService.getUserById(id);
    if (!user) throw new ForbiddenException('회원이 존재하지 않습니다.');

    this.logger.log(`GET /current Success!`);
    return {
      statusCode: 200,
      message: '현재 로그인 유저 조회에 성공했습니다.',
      user: {
        id,
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
        provider: user.provider,
        phone: user.phone,
      },
    };
  }

  @HttpCode(201)
  @Post('send-email')
  @Throttle(5, 360)
  // @UseGuards(RecaptchaGuard)
  @ApiOperation({
    summary: '비밀번호 찾기 email 전송 요청 API',
    description: '비밀번호 찾기를 위해 email을 전송 한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'email 전송 성공',
    type: FindPasswordResponse,
  })
  @ApiBody({ type: FindPasswordDto })
  async sendEmail(
    @Body() findPasswordDto: FindPasswordDto,
  ): Promise<FindPasswordResponse> {
    const user: User = await this.authService.getUserByEmail(
      findPasswordDto.email,
    );
    if (user.name !== findPasswordDto.name) {
      throw new ForbiddenException('회원이 존재하지 않습니다.');
    }

    const passwordToken: string = uuid().toString();
    await this.authService.setPWChangeToken(user.id, passwordToken);

    const check: boolean = await this.mailService.sendEmail(
      user.email,
      user.name,
      passwordToken,
      'password',
    );

    this.logger.log(`POST /send-email Success!`);
    return {
      statusCode: 201,
      message: '이메일을 성공적으로 전송했습니다.',
      result: { check },
    };
  }

  @HttpCode(200)
  @Get('change-password/check')
  @ApiOperation({
    summary: '비밀번호 변경 토큰 유효 검사 API',
    description: '비밀번호 변경 토큰이 유효한지 검사 한다.',
  })
  @ApiResponse({
    status: 200,
    description: '토큰 검사 성공',
    type: FindPasswordResponse,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: '유저 아이디',
  })
  @ApiQuery({
    name: 'token',
    required: true,
    description: '비밀번호 토큰',
  })
  async checkPWToken(@Query() query): Promise<FindPasswordResponse> {
    const token: string = await this.redisService.getKey('pw' + query.id);

    if (
      query.token !==
      token.slice(this.configService.get('CHANGE_PASSWORD_KEY').length)
    ) {
      throw new ForbiddenException('토큰이 일치하지 않습니다.');
    }

    this.logger.log(`GET /change-password/check Success!`);
    return {
      statusCode: 200,
      message: '토큰의 유효기간이 만료되지 않았습니다.',
      result: { check: true },
    };
  }

  @HttpCode(200)
  @Put('change-password/:email')
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
    @Param('email', ValidationPipe) email: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<CommonResponseDto> {
    await this.authService.changePassword(email, changePasswordDto);
    this.logger.log(`PUT /change-password/:email Success!`);
    return {
      statusCode: 200,
      message: '비밀번호가 변경되었습니다.',
    };
  }

  @HttpCode(301)
  @Get('google')
  @Throttle(5, 1)
  @ApiOperation({
    summary: 'google 로그인 API',
    description: 'google 로그인을 요청 한다.',
  })
  @ApiResponse({
    status: 301,
    description: 'google 로그인 요청 성공',
  })
  @UseGuards(GoogleGuard)
  async google() {
    this.logger.log(`GET /google Success!`);
    return HttpStatus.OK;
  }

  @UseGuards(GoogleGuard)
  @Get('google-redirect')
  async googleLogin(@Req() req, @Res({ passthrough: true }) res) {
    const { accessToken, refreshToken }: Tokens =
      await this.authService.googleLogin(req.user as OauthLoginDto, res);

    try {
      res.cookie('AccessToken', accessToken, {
        maxAge: this.configService.get('JWT_EXPIRESIN'),
        httpOnly: true,
        secure:
          this.configService.get('NODE_ENV') === 'production' ? true : false,
      });
      res.cookie('RefreshToken', refreshToken, {
        maxAge: this.configService.get('JWT_REFRESH_EXPIRESIN'),
        httpOnly: true,
        secure:
          this.configService.get('NODE_ENV') === 'production' ? true : false,
      });

      res.redirect(`${this.configService.get('CLIENT_URL')}/`);
      res.end();

      this.logger.log(`GET /google-redirect Success!`);
    } catch (error) {
      throw new ForbiddenException('Cookie Failed!');
    }
  }

  @HttpCode(201)
  @Throttle(5, 360)
  @UseGuards(RecaptchaGuard)
  @Post('send-sms')
  @ApiOperation({
    summary: '계정 찾기 API',
    description: '계정 찾기에서 휴대폰 SMS 인증번호로 본인인증 한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'SMS 전송 성공',
    type: CommonResponseDto,
  })
  @ApiBody({ type: FindAccountDto })
  async sendSMS(
    @Body() findAccountDto: FindAccountDto,
  ): Promise<CommonResponseDto> {
    await this.authService.getUserForAccount(findAccountDto);
    const number = Math.floor(Math.random() * 1000000);
    const verifyCode: string = number.toString().padStart(6, '0');

    await this.redisService.setKey(
      'sms' + findAccountDto.phone,
      verifyCode,
      300,
    );

    await this.smsService.sendSMS(findAccountDto.phone, verifyCode);

    this.logger.log(`POST /send-sms Success!`);
    return {
      statusCode: 201,
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
      const user: User = await this.authService.getUserByPhone(phone);
      if (!user) throw new ForbiddenException('회원이 존재하지 않습니다.');

      this.logger.log(`GET /verify-code Success!`);
      return {
        statusCode: 200,
        message: '인증번호가 일치합니다.',
        user: { id: user.id },
      };
    }
  }

  @HttpCode(200)
  @Get('find-account/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: '유저 아이디',
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
  async getAccount(
    @Param('id', ValidationPipe) id: string,
  ): Promise<FindAccountResponse> {
    const user: User = await this.usersService.getUserById(id);

    let name;
    let email;

    if (!user) {
      name = '';
      email = '';
    } else {
      name = user.name;
      email = user.email;
    }

    this.logger.log(`GET /find-account/:id Success!`);

    return {
      statusCode: 200,
      message: '계정을 찾았습니다.',
      user: { name, email },
    };
  }

  // 이메일 인증
  // 이메일이 유효한지 검사하기
  // 인증번호? 아니면 비밀번호 변경 이메일에서 멘트만 바꾸기

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
