import { Test, TestingModule } from '@nestjs/testing';
import { PillService } from './pill.service';

describe('PillService', () => {
  let service: PillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PillService],
    }).compile();

    service = module.get<PillService>(PillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
