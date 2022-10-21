import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsString } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';
import { pharmacySearchKeyword } from '../pharmacy-search-keyword.enum';

export class PharmacySearchDto {
  @ApiProperty()
  @IsString()
  option: pharmacySearchKeyword;

  @ApiProperty()
  @IsString()
  keyword: string;
}

export class PharmacySearchResponse {
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

export class PharmacySearchResponseDto extends CommonResponseDto {
  @IsJSON()
  pharmacies: PharmacySearchResponse[];
}
