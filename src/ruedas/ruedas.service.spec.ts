import { Test, TestingModule } from '@nestjs/testing';
import { RuedasService } from './ruedas.service';

describe('RuedasService', () => {
  let service: RuedasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuedasService],
    }).compile();

    service = module.get<RuedasService>(RuedasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
