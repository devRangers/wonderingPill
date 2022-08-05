import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as argon from 'argon2';
import { Profile, Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';
import { OauthLoginDto } from '../dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_REST_API_KEY,
      clientSecret: process.env.KAKAO_SECRET_KEY,
      callbackURL: process.env.KAKAO_REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done,
  ) {
    const password = await argon.hash(profile.id);
    const payload: OauthLoginDto = {
      name: profile._json.properties.nickname,
      email: profile._json.kakao_account.email,
      profileImg: profile._json.properties.profile_image
        ? profile._json.properties.profile_image
        : undefined,
      password,
      accessToken,
      refreshToken,
    };

    done(null, payload);
  }
}
