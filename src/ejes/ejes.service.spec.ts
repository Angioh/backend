import { Test, TestingModule } from '@nestjs/testing';
import { EjesService } from './ejes.service';

describe('EjesService', () => {
  let service: EjesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjesService],
    }).compile();

    service = module.get<EjesService>(EjesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
