import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class DeleteUserResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  result: { result: boolean };
}

export class SendInquiryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class SendInquiryResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  result: { result: boolean };
}
