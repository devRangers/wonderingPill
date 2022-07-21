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
  SigninUserDto,
  UseRecapchaDto,
} from './dto';
import { Response } from 'express';
import * as config from 'config';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  private logger = new Logger(`AuthController`);
  constructor(private readonly authService: AuthService) {}

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
  async signupUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user: UserModel = await this.authService.createUser(createUserDto);
    this.logger.verbose(`User ${user.email} Sign-Up Success!
    Payload: ${JSON.stringify({ user })}`);
    return {
      statusCode: 200,
      message: '회원가입에 성공했습니다.',
      user: { id: user.id },
    };
  }

  @HttpCode(200)
  @Post('signin')
  @ApiOperation({
    summary: '유저 로그인 API',
    description: '유저의 accessToken을 발행한다.',
  })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiBody({ type: SigninUserDto })
  async signinUser(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken: string = await this.authService.getAccessToken(
      signinUserDto,
    );

    res.cookie('AccessToken', accessToken, {
      maxAge: process.env.JWT_EXPIRESIN || config.get('jwt').secret,
      httpOnly: true,
    });

    const refreshToken: string = await this.authService.getRefreshToken(
      signinUserDto,
    );

    // redis: refresh token

    res.cookie('RefreshToken', refreshToken, {
      maxAge:
        process.env.JWT_REFRESH_EXPIRESIN || config.get('jwt-refresh').secret,
      httpOnly: true,
    });

    this.logger.verbose(`User ${signinUserDto.email} Sign-In Success!
    Payload: ${JSON.stringify({ accessToken, refreshToken })}`);
    return { accessToken, refreshToken };
  }

  @Get('refresh')
  async refresh() {}

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

    this.logger.verbose(`v3 recaptcha verify human Success!
    Payload: ${JSON.stringify({ checkScore })}`);

    return {
      statusCode: 200,
      message: '정상적인 트래픽 활동입니다.',
      recaptchav3: { result: checkScore },
    };
  }

  @Post('recaptcha-v2')
  async verifyRecaptchaV2() {}
}
