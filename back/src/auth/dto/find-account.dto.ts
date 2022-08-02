import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}

export class FindPasswordResponse {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  statusCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
