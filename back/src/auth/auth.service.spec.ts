import { Test, TestingModule } from '@nestjs/testing';
import { providerType } from './auth-provider.enum';
import { MockAuthService } from './auth.mock';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockProvider = { provide: AuthService, useClass: MockAuthService };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, mockProvider],
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

    const newUser = {
      id: 'uuid_test_1234',
      email: 'test@mail.com',
      name: 'tester',
      password: 'password',
      phone: '01000000000',
      profileImg: 'image.png',
      isDeleted: true,
      birth: '19900101',
      createdAt: new Date('2022 - 08 - 28'),
      updatedAt: new Date('2022-08-28 05:00:47.583'),
      provider: providerType.LOCAL,
    };

    it('should create a user', async () => {
      const createUserSpy = jest
        .spyOn(service, 'createUser')
        .mockResolvedValue(newUser);

      const dto = new CreateUserDto();

      const result = await service.createUser(dto);
      res.status.mockReturnValue(200);

      expect(createUserSpy).toHaveBeenCalledWith(dto);
      expect(result).toEqual(newUser);
      expect(res.status()).toBe(200);
    });
  });
});
