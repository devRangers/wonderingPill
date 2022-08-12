import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PharmacyQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly phone?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly address?: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly start?: number;
}
