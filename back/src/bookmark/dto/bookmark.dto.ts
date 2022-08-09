import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class BookmarkCreateDto {
  @IsNumber()
  @Type(() => Number)
  readonly pharmacyId: number;
}
