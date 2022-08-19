import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as argon from 'argon2';
import { Profile, Strategy } from 'passport-kakao';
import { OauthLoginDto } from '../dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_REST_API_KEY'),
      clientSecret: configService.get('KAKAO_SECRET_KEY'),
      callbackURL: configService.get('KAKAO_REDIRECT_URI'),
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
