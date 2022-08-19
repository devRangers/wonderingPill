import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { providerType } from './auth-provider.enum';
import {
  ChangePasswordDto,
  CreateUserDto,
  FindAccountDto,
  FindPasswordDto,
  OauthLoginDto,
  SigninUserDto,
} from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new ForbiddenException('회원이 존재하지 않습니다.');
      }

      return user;
    } catch {
      throw new ForbiddenException('회원을 찾지 못했습니다.');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new ForbiddenException('회원이 존재하지 않습니다.');
      }

      return user;
    } catch {
      throw new ForbiddenException('회원을 찾지 못했습니다.');
    }
  }

  async getUserByPhone(phone: string): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { phone },
      });

      return user;
    } catch {
      throw new ForbiddenException('회원을 찾지 못했습니다.');
    }
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
        throw new ForbiddenException('회원을 저장하지 못했습니다.');
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
    try {
      const accessToken: string = await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRESIN'),
      });
      let expiresIn;
      if (isSignin) {
        expiresIn = this.configService.get('JWT_REFRESH_EXPIRESIN_AUTOSAVE');
      } else {
        expiresIn = this.configService.get('JWT_REFRESH_EXPIRESIN');
      }
      const refreshToken: string = await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ForbiddenException('토큰 생성에 실패했습니다.');
    }
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
    try {
      const result: boolean = await this.redisService.setKey(
        're' + id,
        this.configService.get('REFRESHTOKEN_KEY') + refreshToken,
        ttl,
      );

      return result;
    } catch (error) {
      throw new ForbiddenException('refresh token이 저장되지 않았습니다.');
    }
  }

  async updateAccessToken(id: string, refreshToken: string): Promise<string> {
    const user: User = await this.getUserById(id);
    try {
      const result: string = await (
        await this.redisService.getKey('re' + id)
      ).slice(this.configService.get('REFRESHTOKEN_KEY').length);

      if (result !== refreshToken) {
        throw new ForbiddenException('Access Denied');
      }

      const accessToken: string = await this.getAccessToken(id, user.email);
      return accessToken;
    } catch (error) {
      throw new ForbiddenException('엑세스 토큰 발급을 실패했습니다.');
    }
  }

  async getAccessToken(id: string, email: string): Promise<string> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email: email,
    };
    try {
      const accessToken: string = await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRESIN'),
      });

      return accessToken;
    } catch (error) {
      throw new ForbiddenException('accessToken을 생성하지 못했습니다.');
    }
  }

  async logout(id: string): Promise<boolean> {
    try {
      await this.redisService.delKey('re' + id);
      return true;
    } catch (error) {
      throw new ForbiddenException('로그아웃을 실패했습니다.');
    }
  }

  async findUser(findPasswordDto: FindPasswordDto): Promise<User> {
    try {
      const user: User = await this.getUserByEmail(findPasswordDto.email);
      if (user.name !== findPasswordDto.name) {
        throw new ForbiddenException('회원이 존재하지 않습니다.');
      }
      return user;
    } catch (error) {
      throw new ForbiddenException('회원을 찾지 못했습니다.');
    }
  }

  async findUserByPhone(findAccountDto: FindAccountDto): Promise<User> {
    const { name, birth, phone } = findAccountDto;
    try {
      const user: User[] = await this.prisma.user.findMany({
        where: {
          AND: {
            name,
            birth,
            phone,
          },
        },
      });

      if (!user || user.length !== 1) {
        throw new ForbiddenException('회원이 존재하지 않습니다.');
      }

      return user.pop();
    } catch (error) {
      throw new ForbiddenException('회원을 찾지 못했습니다.');
    }
  }

  async setPWChangeToken(id: string, token: string): Promise<string> {
    try {
      const result: boolean = await this.redisService.setKey(
        'pw' + id,
        this.configService.get('CHANGE_PASSWORD_KEY') + token,
        Number(this.configService.get('PW_TOKEN_TTL')),
      );
      if (!result) throw new ForbiddenException('토큰을 저장하지 못했습니다.');
      return token;
    } catch (error) {
      throw new ForbiddenException('토큰을 저장할때 에러가 발생했습니다.');
    }
  }

  async createOauthUser(payload: OauthLoginDto, type: string): Promise<User> {
    let provider;
    if (type === 'kakao') provider = providerType.KAKAO;
    else provider = providerType.GOOGLE;
    try {
      const newUser: User = await this.prisma.user.create({
        data: {
          name: payload.name,
          password: payload.password,
          email: payload.email,
          provider,
        },
      });
      return newUser;
    } catch (error) {
      throw new ForbiddenException('회원 정보를 저장하지 못했습니다.');
    }
  }

  async googleLogin(googleLoginDto: OauthLoginDto, res): Promise<Tokens> {
    const user: User = await this.prisma.user.findUnique({
      where: { email: googleLoginDto.email },
    });

    try {
      if (!user) {
        await this.createOauthUser(googleLoginDto, 'google');
      } else if (user.provider !== 'GOOGLE') {
        res.status(403).redirect(`${process.env.CLIENT_URL}/login/error`);
      }

      const { accessToken, refreshToken } = googleLoginDto;

      await this.redisService.setKey(
        'go' + user.id,
        process.env.REFRESHTOKEN_KEY + refreshToken,
        Number(process.env.JWT_REFRESH_EXPIRESIN) / 1000,
      );

      console.log(accessToken, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new ForbiddenException('구글 로그인 중에 문제 발생!');
    }
  }

  async changePassword(
    email,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    try {
      const hashedPassword: string = await argon.hash(
        changePasswordDto.password,
      );
      const user: User = await this.prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      throw new ForbiddenException('비밀번호를 변경하지 못했습니다.');
    }
  }

  // async kakaoLogin(kakaoLoginDto: OauthLoginDto) {
  //   const user: User = await this.createOauthUser(kakaoLoginDto, 'kakao');
  //   const { accessToken, refreshToken } = kakaoLoginDto;

  //   // redis 저장
  //   await this.redisService.setKey(
  //     'ka' + user.id,
  //     process.env.REFRESHTOKEN_KEY + refreshToken,
  //     Number(process.env.JWT_REFRESH_EXPIRESIN) / 1000,
  //   );

  //   return { accessToken, refreshToken };
  // }
}
