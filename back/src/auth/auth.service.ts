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
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuid } from 'uuid';
import { providerType } from './auth-provider.enum';
import {
  CreateUserDto,
  FindPasswordDto,
  KakaoLoginDto,
  SigninUserDto,
} from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ForbiddenException('회원이 존재하지 않습니다.');
    }

    return user;
  }

  async getUserById(id: string): Promise<User> {
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
    const hashedPassword: string = await argon.hash(password);
    try {
      const newUser: User = await this.prisma.user.create({
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

      const isPwMatching: boolean = await argon.verify(user.password, password);
      if (!isPwMatching)
        throw new ForbiddenException('비밀번호가 일치하지 않습니다.');

      const { accessToken, refreshToken }: Tokens = await this.getTokens(
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

    const accessToken: string = await this.jwtService.signAsync(jwtPayload, {
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
    const refreshToken: string = await this.jwtService.signAsync(jwtPayload, {
      secret:
        process.env.JWT_REFRESH_SECRET || config.get('jwt-refresh').secret,
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
      ttl = Number(process.env.JWT_REFRESH_EXPIRESIN_AUTOSAVE) / 1000;
    } else {
      ttl = Number(process.env.JWT_REFRESH_EXPIRESIN) / 1000;
    }
    const result: boolean = await this.redisService.setKey(
      're' + id,
      process.env.REFRESHTOKEN_KEY + refreshToken,
      ttl,
    );

    if (!result) {
      throw new ForbiddenException('refresh token이 저장되지 않았습니다.');
    }

    return result;
  }

  async updateAccessToken(id: string, refreshToken: string): Promise<string> {
    const user: User = await this.getUserById(id);
    const result: string = await (
      await this.redisService.getKey('re' + id)
    ).slice(process.env.REFRESHTOKEN_KEY.length);

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
    const accessToken: string = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET || config.get('jwt').secret,
      expiresIn: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
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
    const user: User = await this.getUserByEmail(findPasswordDto.email);
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
    const result: boolean = await this.redisService.setKey(
      'pw' + id,
      process.env.CHANGE_PASSWORD_KEY + token,
      Number(process.env.PW_TOKEN_TTL),
    );
    if (!result) throw new ForbiddenException('토큰을 저장하지 못했습니다.');
    return token;
  }

  async kakaoLogin(kakaoLoginDto: KakaoLoginDto) {
    const user: User = await this.createOauthUser(kakaoLoginDto);
    const { accessToken, refreshToken } = kakaoLoginDto;

    // redis 저장
    await this.redisService.setKey(
      'ka' + user.id,
      process.env.REFRESHTOKEN_KEY + refreshToken,
      Number(process.env.JWT_REFRESH_EXPIRESIN) / 1000,
    );

    return { accessToken, refreshToken };
  }

  async createOauthUser(payload) {
    const newUser: User = await this.prisma.user.create({
      data: {
        name: payload.name,
        password: payload.password,
        birth: payload.birth,
        email: payload.email,
        provider: providerType.KAKAO,
      },
    });

    if (!newUser) {
      throw new ForbiddenException('회원 정보를 저장하지 못했습니다.');
    }
    return newUser;
  }
}
