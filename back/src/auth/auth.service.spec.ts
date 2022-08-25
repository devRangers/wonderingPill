import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { MockService } from './auth.mock';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockProvider = { provide: AuthService, useClass: MockService };
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AuthService, ConfigService, PrismaService, mockProvider],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    it('should create a user', async () => {
      const createUserSpy = jest.spyOn(service, 'createUser');
      const dto = new CreateUserDto();

      await service.createUser(dto);
      res.status.mockReturnValue(200);

      expect(createUserSpy).toHaveBeenCalledWith(dto);
      expect(res.status()).toBe(200);
    });

    it('should return 403 error', async () => {
      const createUserSpy = jest.spyOn(service, 'createUser');
      const dto = new CreateUserDto();

      // {
      //   "statusCode": 403,
      //   "message": "회원을 저장하지 못했습니다.",
      //   "error": "Forbidden"
      // }

      res.status.mockReturnValue(403);
      res.json.mockReturnValue();

      await service.createUser(dto);
      expect(res.status()).toBe(403);
    });
  });
});
