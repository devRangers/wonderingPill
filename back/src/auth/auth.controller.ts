import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponse,
  LogoutResponse,
  RefreshResponse,
  SigninResponse,
  SigninUserDto,
} from './dto';
import { Response } from 'express';
import * as config from 'config';
import { Tokens } from './types';
import { AccessGuard, RefreshGuard } from 'src/common/guards';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetCurrentUser } from 'src/common/decorators/get.current-user.decorator';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  private logger = new Logger(`AuthController`);
  constructor(private readonly authService: AuthService) {}

  @Public()
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
    // token 발행
    const { accessToken, refreshToken }: Tokens =
      await this.authService.localSignin(signinUserDto);

    // redis: save refresh-token
    // 일단은 db에 저장
    const user: UserModel = await this.authService.saveRefreshToken(
      signinUserDto.email,
      refreshToken,
    );

    // cookie에 accessToken, refreshToken 저장
    res.cookie('AccessToken', accessToken, {
      maxAge: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
      httpOnly: true,
    });

    let maxAge;
    if (signinUserDto.isSignin) {
      maxAge =
        process.env.JWT_REFRESH_EXPIRESIN_AUTOSAVE ||
        config.get('jwt-refresh').expiresIn_autosave;
    } else {
      maxAge =
        process.env.JWT_REFRESH_EXPIRESIN ||
        config.get('jwt-refresh').expiresIn;
    }
    res.cookie('RefreshToken', refreshToken, {
      maxAge,
      httpOnly: true,
    });

    this.logger.verbose(`User ${signinUserDto.email} Sign-In Success!`);
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

  @Public()
  @HttpCode(200)
  @Post('refresh')
  @UseGuards(RefreshGuard)
  @ApiOperation({
    summary: 'accessToken 재발행 API',
    description: 'refreshToken이 만료되지 않았다면 accessToken을 재발행한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Access Token 발행 성공',
    type: RefreshResponse,
  })
  @ApiCookieAuth('refreshToken')
  @ApiCookieAuth('accessToken')
  async refresh(
    @GetCurrentUserId() id: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<RefreshResponse> {
    const accessToken: string = await this.authService.updateAccessToken(
      id,
      refreshToken,
    );

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
      accessToken: { accessToken },
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
    const checkLogout = await this.authService.logout(id);

    let message;
    if (checkLogout) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

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

  // recaptcha를 guard로 대체 가능! 비용 절감
  // 일단은 api로 놔둠
  // @HttpCode(200)
  // @Post('recaptcha-v3')
  // @ApiOperation({
  //   summary: 'Recaptcha v3 요청 API',
  //   description: 'Recaptcha v3에 인증을 요청하고 판별한다.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: '회원가입 성공',
  //   type: RecapchaResponse,
  // })
  // @ApiBody({ type: UseRecapchaDto })
  // async verifyRecaptchaV3(@Body() useRecapchaDto: UseRecapchaDto) {
  //   const data = await this.authService.sendRecaptchaV3(useRecapchaDto);
  //   const checkScore = await this.authService.checkRecaptchaV3(data.score);

  //   this.logger.verbose(`recaptcha v3 verify human Success!
  //   Payload: ${JSON.stringify({ checkScore })}`);

  //   return {
  //     statusCode: 200,
  //     message: '정상적인 트래픽 활동입니다.',
  //     recaptchav3: { result: checkScore },
  //   };
  // }

  // @Post('send-sms')
  // async sendSMS() {}

  // @Post('verify-code')
  // async verifyCode() {}

  // @Get('get-user')
  // async getUser() {}

  // @Post('send-email')
  // async sendEmail() {}
}
