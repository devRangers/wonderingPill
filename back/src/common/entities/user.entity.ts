import { User as UserModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements UserModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  provider: string;

  @ApiProperty()
  profileImg: string;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  birth: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // redis로 옮기기 전까지 DB에 저장
  @ApiProperty()
  refreshToken: string;
}
