import {
  IsArray,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class SetAlarmDto {
  @IsString()
  @IsNotEmpty()
  deviceToken: string;

  @IsArray()
  @IsNotEmpty()
  vip: number[];

  @IsNumber()
  @IsNotEmpty()
  hour: number;

  @IsNumber()
  @IsNotEmpty()
  minute: number;

  @IsString()
  @IsNotEmpty()
  pillName: string;

  @IsString()
  @IsNotEmpty()
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
  result: {
    id: string;
    user_name: string;
    pill_name: string;
    time: string;
    user_id: string;
  }[];
}
