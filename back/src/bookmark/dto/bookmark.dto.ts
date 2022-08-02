import { IsString, IsNumber, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class BookmarkCreateDto {
  @IsNumber()
  @Type(() => Number)
  readonly pharmacyId: number;
}

export class BookmarkResponseDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;
  @ApiProperty()
  @IsString()
  readonly userId: string;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  readonly pharmacyId: number;
}

export class BookmarkListResponseDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;
  @ApiProperty()
  @IsObject()
  readonly Pharmacy: {
    id: number;
    name: string;
    phone: string;
    address: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    holiday: string;
  };
}

export class BookmarkCreateResponseDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  pharmacy_id: number;
}
