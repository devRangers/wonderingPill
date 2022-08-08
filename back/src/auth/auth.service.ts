import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuid } from 'uuid';
import { providerType } from './auth-provider.enum';
import { CreateUserDto, FindPasswordDto, SigninUserDto } from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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

  async localSignin(signinUserDto: SigninUserDto, user: User): Promise<Tokens> {
    try {
      const { email, password, isSignin } = signinUserDto;

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
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      email,
      sub: id,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRESIN'),
    });
    let expiresIn;
    if (isSignin) {
      expiresIn = this.configService.get('JWT_REFRESH_EXPIRESIN_AUTOSAVE');
    } else {
      expiresIn = this.configService.get('JWT_REFRESH_EXPIRESIN');
    }
    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn,
    });
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(
    id: string,
    isSignin: boolean,
    refreshToken: string,
  ): Promise<boolean> {
    let ttl;
    if (isSignin) {
      ttl = Number(
        this.configService.get('JWT_REFRESH_EXPIRESIN_AUTOSAVE') / 1000,
      );
    } else {
      ttl = Number(this.configService.get('JWT_REFRESH_EXPIRESIN') / 1000);
    }
    const result = await this.redisService.setKey(
      're' + id,
      this.configService.get('REFRESHTOKEN_KEY') + refreshToken,
      ttl,
    );

    if (!result) {
      throw new ForbiddenException('refresh token이 저장되지 않았습니다.');
    }

    return result;
  }

  async updateAccessToken(id: string, refreshToken: string): Promise<string> {
    const user = await this.getUserById(id);
    const result = await (
      await this.redisService.getKey('re' + id)
    ).slice(this.configService.get('REFRESHTOKEN_KEY').length);

    if (result !== refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const accessToken: string = await this.getAccessToken(id, user.email);
    return accessToken;
  }

  async getAccessToken(id: string, email: string): Promise<string> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email: email,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRESIN'),
    });

    if (!accessToken) {
      throw new ForbiddenException('accessToken을 생성하지 못했습니다.');
    }

    return accessToken;
  }

  async logout(id: string): Promise<boolean> {
    await this.redisService.delKey('re' + id);
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
    const token: string = uuid().toString();
    const result = await this.redisService.setKey(
      'pw' + id,
      this.configService.get('CHANGE_PASSWORD_KEY') + token,
      Number(this.configService.get('PW_TOKEN_TTL')),
    );
    if (!result) throw new ForbiddenException('토큰을 저장하지 못했습니다.');
    return token;
  }
}
