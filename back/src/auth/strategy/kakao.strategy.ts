import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as argon from 'argon2';
import { Strategy } from 'passport-kakao';
import { KakaoLoginDto } from '../dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    console.log('this is the test comment');
    super({
      clientID: process.env.KAKAO_REST_API_KEY,
      clientSecret: process.env.KAKAO_SECRET_KEY,
      callbackURL: process.env.KAKAO_REDIRECT_URI,
    });
  }

  async validate(
    done,
    profile: any,
    refreshToken: string,
    accessToken: string,
  ) {
    const { id, _json } = profile;
    const password = await argon.hash(id.toString());
    const payload: KakaoLoginDto = {
      name: _json.properties.nickname,
      email: _json.kakao_account.email,
      profileImg: _json.properties.profile_image,
      birth: _json.kakao_account.birthyear + _json.kakao_account.birthday,
      password,
      accessToken,
      refreshToken,
    };

    done(null, payload);
  }
}
