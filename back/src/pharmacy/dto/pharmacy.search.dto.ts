import { IsArray, IsJSON, IsString } from 'class-validator';
import { CommonResponseDto } from 'src/common/dto';
import { pharmacySearchKeyword } from '../pharmacy-search-keyword.enum';

export class PharmacySearchDto {
  @IsString()
  option: pharmacySearchKeyword;

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

class PharmacyBookMarkId {
  id: number;
}

export class pharmacyBookmarkListResponse {
  @IsArray()
  PharmacyBookMark: PharmacyBookMarkId[];
}

export class pharmacyBookmarkListResponseDto extends CommonResponseDto {
  @IsJSON()
  lists: pharmacyBookmarkListResponse;
}
