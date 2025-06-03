import { Test, TestingModule } from '@nestjs/testing';
import { LijasController } from './lijas.controller';
import { LijasService } from './lijas.service';

describe('LijasController', () => {
  let controller: LijasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LijasController],
      providers: [LijasService],
    }).compile();

    controller = module.get<LijasController>(LijasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
