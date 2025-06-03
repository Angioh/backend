import { Test, TestingModule } from '@nestjs/testing';
import { EjesController } from './ejes.controller';
import { EjesService } from './ejes.service';

describe('EjesController', () => {
  let controller: EjesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjesController],
      providers: [EjesService],
    }).compile();

    controller = module.get<EjesController>(EjesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
