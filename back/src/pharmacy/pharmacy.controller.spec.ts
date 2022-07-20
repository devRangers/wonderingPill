import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyController } from './pharmacy.controller';

describe('PharmacyController', () => {
  let controller: PharmacyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyController],
    }).compile();

    controller = module.get<PharmacyController>(PharmacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
