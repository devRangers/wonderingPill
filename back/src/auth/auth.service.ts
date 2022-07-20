import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { providerType } from './auth-provider.enum';
import * as argon from 'argon2';
import { CreateUserDto, SigninUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getUser(email): Promise<User | null> {
    const user: User = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new ForbiddenException('회원이 존재하지 않습니다.');
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    const { name, email, password, phone, birth } = createUserDto;
    const hashedPassword = await argon.hash(password);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name,
          password: hashedPassword,
          phone,
          birth,
          email,
          provider: providerType.LOCAL,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('이미 존재하는 이메일입니다.');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getAccessToken(signinUserDto: SigninUserDto): Promise<string> {
    try {
      const { email, password } = signinUserDto;
      const user = await this.getUser(email);

      const isPwMatching = await argon.verify(user.password, password);
      if (!isPwMatching)
        throw new ForbiddenException('비밀번호가 일치하지 않습니다.');

      // TODO : redis - refresh token update

      const accessToken = await this.jwtService.sign(
        {
          id: user.id,
          email,
          sub: 'accessToken',
        },
        {
          secret: process.env.JWT_SECRET || config.get('jwt').secret,
          expiresIn: process.env.EXPIRESIN || config.get('jwt').expiresIn,
        },
      );
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('로그인에 실패했습니다.');
    }
  }
}
