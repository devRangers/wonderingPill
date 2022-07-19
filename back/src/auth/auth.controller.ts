import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto';

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
  @ApiResponse({ description: '회원가입 성공' })
  @ApiBody({ type: CreateUserDto })
  async signupUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const user: UserModel = await this.authService.createUser(createUserDto);
    this.logger.verbose(`User ${user.email} Sign-Up Success!
    Payload: ${JSON.stringify({ user })}`);
    return user;
  }
}
