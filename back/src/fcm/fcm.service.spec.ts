import { Test, TestingModule } from '@nestjs/testing';
import { FcmService } from './fcm.service';

describe('FcmService', () => {
  let service: FcmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FcmService],
    }).compile();

    service = module.get<FcmService>(FcmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
