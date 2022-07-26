import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponse,
  RecapchaResponse,
  SigninResponse,
  SigninUserDto,
  UseRecapchaDto,
} from './dto';
import { Response } from 'express';
import * as config from 'config';
import { Tokens } from './types';
import { LocalRefresh } from 'src/common/guards';
import { GetCurrentUserId } from 'src/common/decorators';
import { GetCurrentUser } from 'src/common/decorators/get.current-user.decorator';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  private logger = new Logger(`AuthController`);
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signup')
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
    this.logger.verbose(`User ${user.email} Sign-Up Success!
    Payload: ${JSON.stringify({ user })}`);
    return {
      statusCode: 200,
      message: '회원가입에 성공했습니다.',
      user: { id: user.id, email: user.email },
    };
  }

  @HttpCode(200)
  @Post('signin')
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
  ): Promise<any> {
    const { accessToken, refreshToken }: Tokens =
      await this.authService.localSignin(signinUserDto);

    // redis: refresh token
    // 일단은 db에 저장
    const user: UserModel = await this.authService.saveRefreshToken(
      signinUserDto.email,
      refreshToken,
    );

    // 자동로그인 기능 추가 필요

    // cookie에 accessToken, refreshToken 저장
    res.cookie('AccessToken', accessToken, {
      maxAge: process.env.JWT_EXPIRESIN || config.get('jwt').secret,
      httpOnly: true,
    });
    res.cookie('RefreshToken', refreshToken, {
      maxAge:
        process.env.JWT_REFRESH_EXPIRESIN || config.get('jwt-refresh').secret,
      httpOnly: true,
    });

    this.logger.verbose(`User ${signinUserDto.email} Sign-In Success!
    Payload: ${JSON.stringify({ accessToken, refreshToken })}`);
    console.log(new Date());
    return {
      statusCode: 200,
      message: '정상적으로 로그인되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImg: user.profileImg,
      },
    };
  }

  @HttpCode(200)
  @Post('refresh')
  @LocalRefresh()
  async refresh(
    @GetCurrentUserId() id: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    const tokens = this.authService.updateRefreshToken(id, refreshToken);

    return tokens;
  }

  @Get('current-user')
  async currentUser() {}

  // recaptcha를 guard로 대체 가능! 비용 절감
  // 일단은 api로 놔둠
  @HttpCode(200)
  @Post('recaptcha-v3')
  @ApiOperation({
    summary: 'Recaptcha v3 요청 API',
    description: 'Recaptcha v3에 인증을 요청하고 판별한다.',
  })
  @ApiResponse({
    status: 200,
    description: '회원가입 성공',
    type: RecapchaResponse,
  })
  @ApiBody({ type: UseRecapchaDto })
  async verifyRecaptchaV3(@Body() useRecapchaDto: UseRecapchaDto) {
    const data = await this.authService.sendRecaptchaV3(useRecapchaDto);
    const checkScore = await this.authService.checkRecaptchaV3(data.score);

    this.logger.verbose(`recaptcha v3 verify human Success!
    Payload: ${JSON.stringify({ checkScore })}`);

    return {
      statusCode: 200,
      message: '정상적인 트래픽 활동입니다.',
      recaptchav3: { result: checkScore },
    };
  }

  @Post('send-sms')
  async sendSMS() {}

  @Post('verify-code')
  async verifyCode() {}

  @Get('get-user')
  async getUser() {}

  @Post('send-email')
  async sendEmail() {}
}
