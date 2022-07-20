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
import { CreateUserDto, SigninUserDto } from './dto';
import { Response } from 'express';
import * as config from 'config';
import { UserEntity } from 'src/entities';

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
  @ApiResponse({ status: 200, description: '회원가입 성공', type: UserEntity })
  @ApiBody({ type: CreateUserDto })
  async signupUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const user: UserModel = await this.authService.createUser(createUserDto);
    this.logger.verbose(`User ${user.email} Sign-Up Success!
    Payload: ${JSON.stringify({ user })}`);
    return user;
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
  ): Promise<{ accessToken: string }> {
    const accessToken: string = await this.authService.getAccessToken(
      signinUserDto,
    );

    res.cookie('Authentication', accessToken, {
      maxAge: process.env.JWT_EXPIRESIN || config.get('jwt').secret,
      httpOnly: true,
    });

    this.logger.verbose(`User ${signinUserDto.email} Sign-In Success!
    Payload: ${JSON.stringify(accessToken)}`);
    return { accessToken };
  }

  @Get('refresh')
  async refresh() {}
}
