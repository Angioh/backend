import { Test, TestingModule } from '@nestjs/testing';
import { RodamientosService } from './rodamientos.service';

describe('RodamientosService', () => {
  let service: RodamientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RodamientosService],
    }).compile();

    service = module.get<RodamientosService>(RodamientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
