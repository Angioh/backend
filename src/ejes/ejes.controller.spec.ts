import { Test, TestingModule } from '@nestjs/testing';
import { EjesController } from './ejes.controller';
import { EjesService } from './ejes.service';
import { Eje } from './entities/eje.entity';

describe('EjesController', () => {
  let controller: EjesController;
  let service: EjesService;

  const mockEje: Eje = {
    id: 1,
    nombre: 'Eje X',
    descripcion: 'Eje resistente',
    precio: 49.99,
    marca: 'MarcaX',
    anchura: 5,
    altura: 2,
    imagen_url: 'http://example.com/img1.jpg',
    imagen_url2: 'http://example.com/img2.jpg',
    cantidad: 10,
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockEje),
    findAll: jest.fn().mockResolvedValue([mockEje]),
    findOne: jest.fn().mockResolvedValue(mockEje),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjesController],
      providers: [{ provide: EjesService, useValue: mockService }],
    }).compile();

    controller = module.get<EjesController>(EjesController);
    service = module.get<EjesService>(EjesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an eje', async () => {
    const dto: Omit<Eje, 'id'> & { id?: number } = { ...mockEje };
    delete dto.id;
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockEje);
  });

  it('should return all ejes', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockEje]);
  });

  it('should return one eje by id', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockEje);
  });

  it('should update an eje by id', async () => {
    const dto = { nombre: 'Actualizado' };
    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ affected: 1 });
  });

  it('should delete an eje by id', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ affected: 1 });
  });
});
