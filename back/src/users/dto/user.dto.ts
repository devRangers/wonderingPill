import {
  IsArray,
  IsBoolean,
  IsJSON,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

/** 마이페이지 조회 */
/** -------------- */
/** 1. 마이페이지 조회 서비스 반환 타입 */
export class GetMypageResponse {
  @IsArray()
  PharmacyBookMark: { Pharmacy: { name: string; phone: string } }[] | [];

  @IsArray()
  PillBookMark: { Pill: { name: string }; alarm: boolean }[] | [];
}

/** 2. 마이페이지 조회 API 반환 타입 */
export class GetMypageResponseDto extends CommonResponseDto {
  @IsJSON()
  result: {
    user: GetMypageResponse;
  };
}
/** -------------- */

/** Presigned Url 발급 */
/** -------------- */
/** 1. Presigned Url 발급 서비스 반환 타입 */
export class GetPresignedUrlResponse {
  @IsString()
  url: string;

  @IsString()
  fileName: string;
}

/** 2.. Presigned Url 발급 API 반환 타입 */
export class GetPresignedUrlResponseDto extends CommonResponseDto {
  @IsJSON()
  result: GetPresignedUrlResponse;
}
/** -------------- */

/** name, password 변경 API 요청 */
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

/** 회원탈퇴 */
/** -------------- */
/** 1. 회원탈퇴 서비스 반환 타입 */
export class DeleteUserResponse {
  @IsBoolean()
  result: boolean;
}

/** 2. 회원탈퇴 API 반환 타입 */
export class DeleteUserResponseDto extends CommonResponseDto {
  @IsJSON()
  result: DeleteUserResponse;
}
/** -------------- */

/** 고객센터 API 요청 */
export class SendInquiryDto {
  @IsString()
  content: string;
}
