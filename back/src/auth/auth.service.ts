import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { providerType } from './auth-provider.enum';
import * as argon from 'argon2';
import { CreateUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    const { name, email, password, phone, birth } = createUserDto;
    const hashedPassword = await argon.hash(password);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name,
          password: hashedPassword,
          phone,
          birth,
          email,
          provider: providerType.LOCAL,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('이미 존재하는 이메일입니다.');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
