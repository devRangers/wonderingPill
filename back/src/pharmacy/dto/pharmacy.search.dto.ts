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
