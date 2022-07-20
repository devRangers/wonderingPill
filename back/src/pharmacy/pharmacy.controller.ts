import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { Pharmacy } from '@prisma/client';
import { PharmacyQueryDto } from './dto/pharmacy.search.dto';
@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}
  @Get()
  @HttpCode(200)
  async pharmacyList(): Promise<Pharmacy[]> {
    return this.pharmacyService.pharmacyList();
  }

  @Get('search')
  @HttpCode(200)
  async pharmacySearch(@Query() query: PharmacyQueryDto): Promise<Pharmacy[]> {
    const { phone, name, address, start } = query;
    if (phone) {
      return await this.pharmacyService.pharmacySearchPhone(phone, start);
    } else if (name) {
      return await this.pharmacyService.pharmacySearchName(name, start);
    } else if (address) {
      return await this.pharmacyService.pharmacySearchAddress(address, start);
    }
  }
  @Get('count')
  @HttpCode(200)
  async pharmacyCount(@Query() query: PharmacyQueryDto): Promise<number> {
    const { phone, name, address } = query;
    if (phone) {
      return await this.pharmacyService.pharmacyCountPhone(phone);
    } else if (name) {
      return await this.pharmacyService.pharmacyCountName(name);
    } else if (address) {
      return await this.pharmacyService.pharmacyCountAddress(address);
    }
  }
}
