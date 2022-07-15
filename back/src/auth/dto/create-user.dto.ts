import {
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { providerType } from '../auth-provider.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.[a-z])(?=.\d)(?=.*[!@#$%^&*])(?=.{8,})/)
  password: string;

  @IsDate()
  birth: Date;

  @IsNumber()
  phone: number;

  @IsString()
  provider: providerType;
}
