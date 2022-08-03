import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
  birth: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}

export class FindPasswordResponse extends CommonResponseDto {}
