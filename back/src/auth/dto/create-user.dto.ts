import {
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CommonResponseDto } from 'src/common/dto/common.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    {
      message: '생년월일 양식에 맞게 작성하세요.',
    },
  )
  birth: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\d{3,4}\d{4}$/, {
    message: '휴대폰번호 양식에 맞게 작성하세요.',
  })
  phone: string;
}

export class CreateUserResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  user: { id: string; email: string };
}
