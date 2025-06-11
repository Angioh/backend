import { Test, TestingModule } from '@nestjs/testing';
import { EjesService } from './ejes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Eje } from './entities/eje.entity';
import { Repository } from 'typeorm';

describe('EjesService', () => {
  let service: EjesService;
  let repo: jest.Mocked<Repository<Eje>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EjesService,
        {
          provide: getRepositoryToken(Eje),
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

    service = module.get<EjesService>(EjesService);
    repo = module.get(getRepositoryToken(Eje));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an eje', async () => {
    const dto = {
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
    const created = { id: 1, ...dto };

    repo.create.mockReturnValue(created as Eje);
    repo.save.mockResolvedValue(created as Eje);

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(created);
  });

  it('should return all ejes', async () => {
    const ejes = [{ id: 1, nombre: 'Eje 1' }] as Eje[];
    repo.find.mockResolvedValue(ejes);

    const result = await service.findAll();
    expect(result).toEqual(ejes);
  });

  it('should return one eje by id', async () => {
    const eje = { id: 1, nombre: 'Eje A' } as Eje;
    repo.findOne.mockResolvedValue(eje);

    const result = await service.findOne(1);
    expect(result).toEqual(eje);
  });

  it('should update an eje', async () => {
    const updateResult = { affected: 1 };
    repo.update.mockResolvedValue(updateResult as any);

    const result = await service.update(1, { nombre: 'Eje Modificado' });
    expect(result).toEqual(updateResult);
  });

  it('should delete an eje', async () => {
    const deleteResult = { affected: 1 };
    repo.delete.mockResolvedValue(deleteResult as any);

    const result = await service.remove(1);
    expect(result).toEqual(deleteResult);
  });
});
