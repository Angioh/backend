import { LijasController } from './lijas.controller';
import { LijasService } from './lijas.service';
import { Lija } from './entities/lija.entity';
import { Test, TestingModule } from '@nestjs/testing';


describe('LijasController', () => {
  let controller: LijasController;
  let service: LijasService;

  const mockLija: Lija = {
    id: 1,
    nombre: 'Lija Fina',
    descripcion: 'Para acabado',
    precio: 12.5,
    marca: 'Norton',
    color: 'Rojo',
    imagen_url: 'http://example.com/img1.jpg',
    imagen_url2: 'http://example.com/img2.jpg',
    cantidad: 50,
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockLija),
    findAll: jest.fn().mockResolvedValue([mockLija]),
    findOne: jest.fn().mockResolvedValue(mockLija),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LijasController],
      providers: [{ provide: LijasService, useValue: mockService }],
    }).compile();

    controller = module.get<LijasController>(LijasController);
    service = module.get<LijasService>(LijasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a lija', async () => {
    const dto = {
  nombre: 'Lija Fina',
  descripcion: 'Para acabado',
  precio: 12.5,
  marca: 'Norton',
  color: 'Rojo',
  imagen_url: 'http://example.com/img1.jpg',
  imagen_url2: 'http://example.com/img2.jpg',
  cantidad: 50,
};
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockLija);
  });

  it('should return all lijas', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockLija]);
  });

  it('should return one lija by id', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockLija);
  });

  it('should update a lija by id', async () => {
    const dto = { nombre: 'Actualizada' };
    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ affected: 1 });
  });

  it('should delete a lija by id', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ affected: 1 });
  });
});
