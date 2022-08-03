import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import * as config from 'config';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { providerType } from './auth-provider.enum';
import { CreateUserDto, FindPasswordDto, SigninUserDto } from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async getUserByEmail(email): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ForbiddenException('회원이 존재하지 않습니다.');
    }

    return user;
  }

  async getUserById(id): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ForbiddenException('회원이 존재하지 않습니다.');
    }

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

  async localSignin(signinUserDto: SigninUserDto): Promise<Tokens | null> {
    try {
      const { email, password, isSignin } = signinUserDto;
      const user = await this.getUserByEmail(email);

      const isPwMatching = await argon.verify(user.password, password);
      if (!isPwMatching)
        throw new ForbiddenException('비밀번호가 일치하지 않습니다.');

      const { accessToken, refreshToken } = await this.getTokens(
        user.id,
        email,
        isSignin,
      );
      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException('로그인에 실패했습니다.');
    }
  }

  async getTokens(
    id: string,
    email: string,
    isSignin: boolean,
  ): Promise<Tokens | null> {
    const jwtPayload: JwtPayload = {
      email,
      sub: id,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET || config.get('jwt').secret,
      expiresIn: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
    });
    let expiresIn;
    if (isSignin) {
      expiresIn =
        process.env.JWT_REFRESH_EXPIRESIN_AUTOSAVE ||
        config.get('jwt-refresh').expiresIn_autosave;
    } else {
      expiresIn =
        process.env.JWT_REFRESH_EXPIRESIN ||
        config.get('jwt-refresh').expiresIn;
    }
    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret:
        process.env.JWT_REFRESH_SECRET || config.get('jwt-refresh').secret,
      expiresIn,
    });
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        refreshToken,
      },
    });

    if (!user) {
      throw new ForbiddenException('refresh token이 저장되지 않았습니다.');
    }

    return user;
  }

  async updateAccessToken(id: string, refreshToken: string): Promise<string> {
    const user = await this.getUserById(id);
    if (user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const accessToken: string = await this.getAccessToken(id, user.email);

    await this.saveRefreshToken(user.email, refreshToken);
    return accessToken;
  }

  async getAccessToken(id: string, email: string): Promise<string> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email: email,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET || config.get('jwt').secret,
      expiresIn: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
    });

    if (!accessToken) {
      throw new ForbiddenException('accessToken을 생성하지 못했습니다.');
    }

    return accessToken;
  }

  async logout(id: string): Promise<boolean> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: null,
      },
    });

    if (!user) {
      throw new ForbiddenException('토큰을 삭제하지 못했습니다.');
    }
    return true;
  }

  async findUser(findPasswordDto: FindPasswordDto): Promise<User> {
    const user = await this.getUserByEmail(findPasswordDto.email);
    if (user.name !== findPasswordDto.name) {
      throw new ForbiddenException('회원이 존재하지 않습니다.');
    }
    if (user.birth !== findPasswordDto.birth) {
      throw new ForbiddenException('회원이 존재하지 않습니다.');
    }

    return user;
  }

  async getPWChangeToken(id: string): Promise<string> {
    const token = uuid();
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        changePWToken: token,
      },
    });
    if (!user) throw new ForbiddenException('토큰을 저장하지 못했습니다.');
    return token;
  }
}
