import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class BookmarkCreateDto {
  @IsNumber()
  @Type(() => Number)
  readonly id: number;
  @IsString()
  readonly userId: string;
  @IsNumber()
  @Type(() => Number)
  readonly pharmacyId: number;
}

export class BookmarkResponseDto {
  @IsNumber()
  @Type(() => Number)
  readonly id: number;
  @IsString()
  readonly userId: string;
  @IsNumber()
  @Type(() => Number)
  readonly pharmacyId: number;
}
