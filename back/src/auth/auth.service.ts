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
import { CreateUserDto, SigninUserDto, UseRecapchaDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { HttpService } from '@nestjs/axios';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async getUser(email): Promise<User | null> {
    const user: User = await this.prisma.user.findUnique({
      where: { email },
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

  async localSignin(
    signinUserDto: SigninUserDto,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const { email, password, isSignin } = signinUserDto;
      const user = await this.getUser(email);

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
    let accessToken, refreshToken;

    if (isSignin) {
      [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.JWT_SECRET || config.get('jwt').secret,
          expiresIn: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret:
            process.env.JWT_REFRESH_SECRET || config.get('jwt-refresh').secret,
          expiresIn:
            process.env.JWT_REFRESH_EXPIRESIN ||
            config.get('jwt-refresh').expiresIn,
        }),
      ]);
    } else {
      accessToken = this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET || config.get('jwt').secret,
        expiresIn: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
      });
      refreshToken = null;
    }
    return { accessToken, refreshToken };
  }

  async saveRTandIsSignin(email, refreshToken, isSignin): Promise<User | null> {
    const user = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        refreshToken,
        isSignin,
      },
    });

    if (!user) {
      throw new ForbiddenException('refresh token이 저장되지 않았습니다.');
    }

    return user;
  }

  async updateAccessToken(req, id, refreshToken): Promise<string | null> {
    const user = await this.getUser({ email: id });

    console.log(user);
    const isRTMatches = await argon.verify(user.refreshToken, refreshToken);
    if (!isRTMatches) throw new ForbiddenException('Access Denied');

    if (user.isSignin === true) {
      const accessToken: string | null = await this.checkTokens(
        req,
        user.id,
        user.email,
      );

      return accessToken;
    }
    return null;
  }

  async checkTokens(req, id, email) {
    const jwtPayload: JwtPayload = {
      email,
      sub: id,
    };

    if (req.cookie.refreshToken) {
      if (!req.cookies.accessToken) {
        const accessToken = this.jwtService.signAsync(jwtPayload, {
          secret: process.env.JWT_SECRET || config.get('jwt').secret,
          expiresIn: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
        });
        req.cookie('AccessToken', accessToken, {
          maxAge: process.env.JWT_EXPIRESIN || config.get('jwt').secret,
          httpOnly: true,
        });
        return accessToken;
      }
      return req.cookies.accessToken;
    }
    return null;
  }

  async sendRecaptchaV3(useRecapchaDto: UseRecapchaDto): Promise<any> {
    const result = await this.httpService
      .post(
        `${process.env.RECAPTCHA_V3_PUBLIC_URL}?secret=${process.env.RECAPTCHA_V3_SECRETKEY}&response=${useRecapchaDto.token}`,
      )
      .toPromise();
    if (!result.data.success || !result) {
      throw new ForbiddenException('recaptcha-v3 인증 요청에 실패하였습니다.');
    }
    return result.data;
  }

  async checkRecaptchaV3(score: number): Promise<boolean> {
    if (score < 0.8) {
      throw new UnauthorizedException(
        '의심스러운 트래픽 활동이 감지되었습니다.',
      );
    }
    return true;
  }
}
