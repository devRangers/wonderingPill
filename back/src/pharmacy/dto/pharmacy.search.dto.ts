import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PharmacyQueryDto {
  @IsOptional()
  @IsString()
  readonly phone?: string;
  @IsOptional()
  @IsString()
  readonly name?: string;
  @IsOptional()
  @IsString()
  readonly address?: string;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly start?: number;
}

export class PharmacyResponse {
  @ApiProperty({ description: '고유 ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '번호' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '주소' })
  @IsString()
  address: string;

  @ApiProperty({ description: '월요일' })
  @IsString()
  monday: string;
  @ApiProperty({ description: '화요일' })
  @IsString()
  tuesday: string;
  @ApiProperty({ description: '수요일' })
  @IsString()
  wednesday: string;
  @ApiProperty({ description: '목요일' })
  @IsString()
  thursday: string;
  @ApiProperty({ description: '금요일' })
  @IsString()
  friday: string;
  @ApiProperty({ description: '토요일' })
  @IsString()
  saturday: string;
  @ApiProperty({ description: '일요일' })
  @IsString()
  sunday: string;
  @ApiProperty({ description: '공휴일' })
  @IsString()
  holiday: string;
}

export class PharmacyCountResponse {
  @ApiProperty({ description: '검색 개수' })
  @IsNumber()
  count: number;
}
