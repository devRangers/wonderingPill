import { IsNotEmpty, IsString } from 'class-validator';

export class SetAlarmDto {
  @IsString()
  @IsNotEmpty()
  deviceToken: string;
}
