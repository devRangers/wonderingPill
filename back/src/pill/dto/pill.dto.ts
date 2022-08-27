import { IsJSON } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class GetAlarmResultResponseDto extends CommonResponseDto {
  @IsJSON()
  result: {
    title: string;
    effect: string;
    sideEffect: string;
    company: string;
    usage: string;
    caution: string;
    keep: string;
    cautionContent: string;
    interactionContent: string;
  };
}
