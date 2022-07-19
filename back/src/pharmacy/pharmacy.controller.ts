import { Controller, Get, HttpCode, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { PharmacyService } from './pharmacy.service';
import { Pharmacy } from '@prisma/client';

type pharmacyQuery = {
  phone?: string;
  name?: string;
  address?: string;
  pharmacyId?: number;
};
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
  async pharmacySearch(@Query() query: pharmacyQuery): Promise<Pharmacy[]> {
    const { phone, name, address, pharmacyId } = query;
    if (phone)
      return this.pharmacyService.pharmacySearchPhone(phone, +pharmacyId);
    else if (name)
      return this.pharmacyService.pharmacySearchName(name, +pharmacyId);
    else if (address)
      return this.pharmacyService.pharmacySearchAddress(address, +pharmacyId);
  }
}
