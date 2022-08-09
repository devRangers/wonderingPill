import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);

    await prismaService.user.create({
      data: {
        id: '1',
        email: 'string124453@email.com',
        name: 'string',
        password: 'string1324533@',
        birth: '19551212',
        phone: '01000000000',
      },
    });
  });

  afterAll(() => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByEmail', () => {
    it('should return a user', async () => {
      const user = await service.getUserByEmail('string124453@email.com');
      expect(user).toBeDefined();
      expect(user.email).toEqual('string124453@email.com');
    });

    it('should throw forbidden error', async () => {
      try {
        await service.getUserByEmail('999');
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
        expect(e.message).toEqual('회원이 존재하지 않습니다.');
      }
    });
  });
});
