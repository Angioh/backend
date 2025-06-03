import { Test, TestingModule } from '@nestjs/testing';
import { TornillosService } from './tornillos.service';

describe('TornillosService', () => {
  let service: TornillosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TornillosService],
    }).compile();

    service = module.get<TornillosService>(TornillosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
