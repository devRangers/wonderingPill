import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class UseRecapchaDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class RecapchaResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  recaptchav2: { result: boolean };
}
