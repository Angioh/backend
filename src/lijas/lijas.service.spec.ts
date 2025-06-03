import { Test, TestingModule } from '@nestjs/testing';
import { LijasService } from './lijas.service';

describe('LijasService', () => {
  let service: LijasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LijasService],
    }).compile();

    service = module.get<LijasService>(LijasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
