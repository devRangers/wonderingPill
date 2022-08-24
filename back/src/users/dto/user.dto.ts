import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { providerType } from 'src/auth/auth-provider.enum';
import { CommonResponseDto } from 'src/common/dto';

export class DeleteUserResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  result: { result: boolean };
}

export class SendInquiryDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,20}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  newPassword?: string;
}

export class SendInquiryResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  result: { inquiry };
}

export class getUserResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
  result: { user };
}

export class getSignedUrlResponse extends CommonResponseDto {
  @IsJSON()
  @IsNotEmpty()
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
