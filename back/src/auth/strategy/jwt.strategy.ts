import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import * as config from 'config';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.AccessToken;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt').expiresIn,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
