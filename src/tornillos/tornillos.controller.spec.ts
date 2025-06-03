import { Test, TestingModule } from '@nestjs/testing';
import { TornillosController } from './tornillos.controller';
import { TornillosService } from './tornillos.service';

describe('TornillosController', () => {
  let controller: TornillosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TornillosController],
      providers: [TornillosService],
    }).compile();

    controller = module.get<TornillosController>(TornillosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
