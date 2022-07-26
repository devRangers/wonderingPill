import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class BookmarkCreateDto {
  @IsString()
  readonly userId: string;
  @IsNumber()
  @Type(() => Number)
  readonly pharmacyId: number;
}
