import {
  IsArray,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

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

export class DeleteAlarmsDto {
  @IsArray()
  ids: string[];
}

export class GetAlarmsResponseDto extends CommonResponseDto {
  @IsJSON()
  alarms: {
    id: string;
    user_name: string;
    pill_name: string;
    time: string;
  }[];
}

export class GetAlarmSetResponseDto extends CommonResponseDto {
  @IsJSON()
  alarm: { minute: number; hour: number; vip: number[]; repeatTime: number };
}
