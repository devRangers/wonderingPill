import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UseRecapchaDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class RecapchaResponse {
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
  recaptchav3: { result: boolean };
}
