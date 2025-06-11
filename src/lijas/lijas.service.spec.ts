import { Test, TestingModule } from '@nestjs/testing';
import { LijasService } from './lijas.service';
import { Lija } from './entities/lija.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('LijasService', () => {
  let service: LijasService;
  let repo: jest.Mocked<Repository<Lija>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LijasService,
        {
          provide: getRepositoryToken(Lija),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LijasService>(LijasService);
    repo = module.get(getRepositoryToken(Lija));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    const created = { id: 1, ...dto };

    repo.create.mockReturnValue(created as Lija);
    repo.save.mockResolvedValue(created as Lija);

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(created);
  });

  it('should return all lijas', async () => {
    const lijas = [{ id: 1, nombre: 'Lija Fina' }] as Lija[];
    repo.find.mockResolvedValue(lijas);

    const result = await service.findAll();
    expect(result).toEqual(lijas);
  });

  it('should return one lija by id', async () => {
    const lija = { id: 1, nombre: 'Lija Media' } as Lija;
    repo.findOne.mockResolvedValue(lija);

    const result = await service.findOne(1);
    expect(result).toEqual(lija);
  });

  it('should update a lija', async () => {
    const updateResult = { affected: 1 };
    repo.update.mockResolvedValue(updateResult as any);

    const result = await service.update(1, { nombre: 'Lija Actualizada' });
    expect(result).toEqual(updateResult);
  });

  it('should delete a lija', async () => {
    const deleteResult = { affected: 1 };
    repo.delete.mockResolvedValue(deleteResult as any);

    const result = await service.remove(1);
    expect(result).toEqual(deleteResult);
  });
});
