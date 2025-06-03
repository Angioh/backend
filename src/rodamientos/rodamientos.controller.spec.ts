import { Test, TestingModule } from '@nestjs/testing';
import { RodamientosController } from './rodamientos.controller';
import { RodamientosService } from './rodamientos.service';

describe('RodamientosController', () => {
  let controller: RodamientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RodamientosController],
      providers: [RodamientosService],
    }).compile();

    controller = module.get<RodamientosController>(RodamientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
