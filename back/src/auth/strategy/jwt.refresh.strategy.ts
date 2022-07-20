import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import * as config from 'config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.RefreshToken;
        },
      ]),
      secretOrKey:
        process.env.JWT_SECRET || config.get('jwt-refresh').expiresIn,
      ignoreExpiration: true,
    });
  }

  async validate(req: Request, email: string): Promise<any> {
    const user = await this.authService.getUser({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const refreshToken = req?.cookies?.RefreshToken;
    if (!refreshToken)
      throw new ForbiddenException('Refresh token이 만료되었습니다.');
    return { ...user, refreshToken };
  }
}
