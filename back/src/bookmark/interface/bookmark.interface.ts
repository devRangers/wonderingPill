import { CommonResponseDto } from 'src/common/dto';

export interface BookmarkResponse extends CommonResponseDto {
  id: number;
  userId: string;
  pharmacyId: number;
}

export interface BookmarkListResponse extends CommonResponseDto {
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
  }[];
}

export interface BookmarkGetResponse extends CommonResponseDto {
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

export interface BookmarkCreateResponse extends CommonResponseDto {
  bookmark: {
    id: number;
    pharmacy_id: number;
  };
}
