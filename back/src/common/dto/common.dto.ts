import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommonResponseDto {
  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
