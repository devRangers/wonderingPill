import {
  IsArray,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

/** 북마크한 알약의 알림 설정 API 요청 */
export class SetAlarmDto {
  @IsString()
  pillBookmarkId: string;

  @IsString()
  deviceToken: string;

  @IsArray()
  vip: number[];

  @IsNumber()
  hour: number;

  @IsNumber()
  minute: number;

  @IsString()
  pillName: string;

  @IsString()
  userName: string;

  @IsNumber()
  @IsOptional()
  repeatTime: number;
}

/** 알림 설정 내역 조회 */
/** -------------- */
/** 1. 알림 설정 내역 조회 서비스 반환 타입 */
export class GetAlarmSettingResponse {
  @IsNumber()
  minute: number;

  @IsNumber()
  hour: number;

  @IsArray()
  vip: number[];

  @IsNumber()
  repeatTime: number;

  @IsString()
  pillName: string;
}

/** 2. 알림 설정 내역 조회 API 반환 타입 */
export class GetAlarmSettingResponseDto extends CommonResponseDto {
  @IsJSON()
  alarm: GetAlarmSettingResponse;
}
/** -------------- */

export class GetAlarmsResponseDto extends CommonResponseDto {
  @IsJSON()
  alarms: GetAlarmsResponse[];
}

export class GetAlarmsResponse {
  id: string;
  user_name: string;
  pill_name: string;
  time: string;
  check: boolean;
  pillBookmarkId: string;
}

export class DeleteAlarmsDto {
  @IsArray()
  ids: string[];
}
