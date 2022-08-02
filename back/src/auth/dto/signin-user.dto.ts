import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class SigninUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isSignin: boolean;
}

export class SigninResponse extends CommonResponseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  statusCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  user: {
    id: string;
    email: string;
    name: string;
    profileImg: string;
  };
}

export class RefreshResponse extends CommonResponseDto {}

export class LogoutResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  checkLogout: {
    checkLogout: boolean;
  };
}
