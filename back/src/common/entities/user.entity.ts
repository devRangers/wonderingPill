import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { providerType } from 'src/auth/auth-provider.enum';

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
  provider: providerType;

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
}
