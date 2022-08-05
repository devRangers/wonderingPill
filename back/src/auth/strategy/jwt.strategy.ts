import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
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
      secretOrKey: process.env.JWT_SECRET || config.get('jwt').expiresIn,
      ignoreExpiration: true,
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
