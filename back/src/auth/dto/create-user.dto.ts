import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  // @Matches(/^[0-9]$/, {
  //   message: '비밀번호 양식에 맞게 작성하세요.',
  // })
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  birth: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
}
