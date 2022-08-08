import { CommonResponseDto } from 'src/common/dto';

export interface PharmacyListResponse extends CommonResponseDto {
  pharmacy: {
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
  }[];
}
export interface PharmacyResponse extends CommonResponseDto {
  pharmacy: {
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

export interface PharmacyCountResponse extends CommonResponseDto {
  count: number;
}
