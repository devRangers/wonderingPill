import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class DeleteUserResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  result: { result: boolean };
}
