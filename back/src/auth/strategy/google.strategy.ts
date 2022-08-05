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

  async validate(
    // @Req() req,
    accessToken: string,
    refreshToken: string,
    profile,
  ) {
    const { id, name, emails, photos } = profile;
    const password = await argon.hash(id);

    // const { query: { error, code } = {} } = req;
    // var auth = new google.auth.OAuth2(
    //   process.env.GOOGLE_CLIENT_ID,
    //   process.env.GOOGLE_CLIENT_PASSWORD,
    //   'https://developers.google.com/oauthplayground',
    // );

    // const { tokens } = await auth.getToken(code);
    // console.log(auth.refresh_token);

    // auth.setCredentials({
    //   access_token: refresh_token,
    //   refresh_token: refreshToken,
    // });

    console.log(refreshToken);

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
