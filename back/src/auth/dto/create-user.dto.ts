import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.[a-z])(?=.\d)(?=.*[!@#$%^&*])(?=.{8,})/)
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  birth: string;

  @IsString()
  @ApiProperty()
  phone: string;
}
