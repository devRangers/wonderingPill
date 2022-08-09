import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const accessToken = req?.cookies?.AccessToken;
          if (!accessToken) {
            return null;
          }
          return accessToken;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: true,
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
