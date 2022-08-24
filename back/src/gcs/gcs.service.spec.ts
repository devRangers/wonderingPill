import { Test, TestingModule } from '@nestjs/testing';
import { GcsService } from './gcs.service';

describe('GcsService', () => {
  let service: GcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcsService],
    }).compile();

    service = module.get<GcsService>(GcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
