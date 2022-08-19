import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';
import { providerType } from 'src/auth/auth-provider.enum';
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
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class SendInquiryResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  result: { inquiry };
}

export class getUserResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  result: { user };
}

export class getSignedUrlResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  @ApiProperty()
  result: { url: string };
}

export class User {
  id: number;
  email: string;
  name: string;
  phone: string;
  password: string;
  profileImg: string;
  birth: string;
  provider: providerType;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
