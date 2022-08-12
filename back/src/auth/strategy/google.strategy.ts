import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as argon from 'argon2';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_PASSWORD,
      callbackURL: process.env.GOOGLE_REDIRECT,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile) {
    const { id, name, emails, photos } = profile;
    const password = await argon.hash(id);
    const payload = {
      password,
      name: name.givenName,
      email: emails[0].value,
      profileImg: photos,
      accessToken,
      refreshToken,
    };

    return payload;
  }
}
