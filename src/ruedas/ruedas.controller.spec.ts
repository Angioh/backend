import { Test, TestingModule } from '@nestjs/testing';
import { RuedasController } from './ruedas.controller';
import { RuedasService } from './ruedas.service';

describe('RuedasController', () => {
  let controller: RuedasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuedasController],
      providers: [RuedasService],
    }).compile();

    controller = module.get<RuedasController>(RuedasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
