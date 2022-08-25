import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SetAlarmDto {
  @IsString()
  @IsNotEmpty()
  deviceToken: string;

  @IsArray()
  @IsNotEmpty()
  vip: string[];

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
