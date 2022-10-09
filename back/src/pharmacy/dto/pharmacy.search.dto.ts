import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Pharmacy } from 'prisma/postgresClient';
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

export class PharmacySearchResponseDto extends CommonResponseDto {
  pharmacies: Pharmacy[];
}
