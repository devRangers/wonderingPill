import { Type } from 'class-transformer';
import { IsJSON, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from '../../common/dto';
export class BookmarkCreateDto {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  readonly pharmacyId: number;
}

export class Pharmacy {
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
}
export class BookmarkResponseDto extends CommonResponseDto {
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  userId: string;
  @IsNumber()
  @ApiProperty()
  pharmacyId: number;
}

export class BookmarkGetResponseDto extends CommonResponseDto {
  @ApiProperty()
  @IsJSON()
  bookmark: {
    id: number;
    Pharmacy: {
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
  };
}

export class BookmarkListResponseDto extends CommonResponseDto {
  @ApiProperty({ type: [Pharmacy] })
  @IsJSON()
  bookmark: {
    id: number;
    Pharmacy: Pharmacy;
  }[];
}

export class BookmarkCreateResponseDto extends CommonResponseDto {
  @ApiProperty()
  @IsJSON()
  bookmark: {
    id: number;
    pharmacy_id: number;
  };
}
