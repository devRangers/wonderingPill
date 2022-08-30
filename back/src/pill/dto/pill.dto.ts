import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';

export class pillSearchDto {
  @IsString()
  @IsNotEmpty()
  shape: string;

  @IsString()
  @IsNotEmpty()
  colors: string;

  @IsString()
  @IsNotEmpty()
  mark: string;

  @IsString()
  @IsNotEmpty()
  letters: string;

  @IsString()
  @IsOptional()
  name: string;
}

export class pillSearchResponseDto extends CommonResponseDto {
  @IsJSON()
  pills: {
    id: number;
    name: string;
    code: string;
    PillBookMark: string[];
  };
}

export class pillResultResponseDto extends CommonResponseDto {
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
