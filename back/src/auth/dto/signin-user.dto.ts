import {
  IsBoolean,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class SigninUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isSignin: boolean;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class SigninResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  user: {
    id: string;
    email: string;
    name: string;
    profileImg: string;
    provider: string;
    phone: string;
  };
}

export class LogoutResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  result: {
    checkLogout: boolean;
  };
}

export class OauthLoginDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  profileImg: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
