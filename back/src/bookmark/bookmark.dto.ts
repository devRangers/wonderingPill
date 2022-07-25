import { IsString, IsNumber } from 'class-validator';

export class BookmarkCreateDto {
  @IsString()
  readonly userId: string;
  @IsNumber()
  readonly pharmacyId: number;
}
