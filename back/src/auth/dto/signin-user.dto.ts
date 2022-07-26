import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

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
}

export class SigninResponse {
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
