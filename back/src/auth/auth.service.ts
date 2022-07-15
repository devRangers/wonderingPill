import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { providerType } from './auth-provider.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const { name, email, password, phone, birth } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {
      name,
      password: hashedPassword,
      phone,
      birth,
      email,
      provider: providerType.LOCAL,
    };

    try {
      const user = await this.prisma.user.create({ data });
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 email 입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
