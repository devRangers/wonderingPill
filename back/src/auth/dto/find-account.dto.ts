import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString, Matches } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class FindPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Matches(
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    {
      message: '생년월일 양식에 맞게 작성하세요.',
    },
  )
  birth: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}

export class FindPasswordResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  result: { result: boolean };
}

export class ChangePasswordDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;
}

export class FindAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Matches(
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    {
      message: '생년월일 양식에 맞게 작성하세요.',
    },
  )
  birth: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{3}\d{3,4}\d{4}$/, {
    message: '휴대폰번호 양식에 맞게 작성하세요.',
  })
  phone: string;
}
