import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { Pedido, PedidoEstado } from './pedido.entity';
import { PedidoItem } from './pedido-item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PedidosService', () => {
  let service: PedidosService;
  let pedidosRepo: jest.Mocked<Repository<Pedido>>;
  let itemsRepo: jest.Mocked<Repository<PedidoItem>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        {
          provide: getRepositoryToken(Pedido),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PedidoItem),
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
    pedidosRepo = module.get(getRepositoryToken(Pedido));
    itemsRepo = module.get(getRepositoryToken(PedidoItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pedido with items', async () => {
    const dto = {
      direccion: 'Calle Falsa 123',
      telefono: '123456789',
      nombre_user: 'Juan',
      userId: 1,
      cantidad: 3,
      items: [
        {
          id: 1,
          nombre: 'Producto 1',
          precio: 10.5,
          imagen_url: 'url1',
          tipo: 'tabla',
          cantidad: 2,
        },
      ],
    };

    const createdPedido = {
      id: 1,
      ...dto,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      estado: PedidoEstado.RECIBIDO, // or another valid PedidoEstado value
      items: [],
    };

    pedidosRepo.create.mockReturnValue(createdPedido as Pedido);
    itemsRepo.create.mockImplementation((item) => item as PedidoItem);
    pedidosRepo.save.mockResolvedValue({
      ...createdPedido,
      items: dto.items,
    } as Pedido);

    const result = await service.create(dto);
    expect(pedidosRepo.create).toHaveBeenCalled();
    expect(pedidosRepo.save).toHaveBeenCalledWith({
      ...createdPedido,
      items: dto.items,
    });
    expect(result.items).toHaveLength(1);
  });

  it('should get all pedidos', async () => {
    const pedidos: Pedido[] = [{
  id: 1,
  direccion: 'Calle 123',
  telefono: '123456789',
  estado: PedidoEstado.RECIBIDO,
  cantidad: 2,
  nombre_user: 'Juan',
  userId: 1,
  fechaCreacion: new Date(),
  fechaActualizacion: new Date(),
  items: [],
}];
    pedidosRepo.find.mockResolvedValue(pedidos);

    const result = await service.findAll();
    expect(result).toEqual(pedidos);
  });

  it('should return one pedido by id', async () => {
    const pedido : Pedido = {
  id: 1,
  direccion: 'Calle 123',
  telefono: '123456789',
  estado: PedidoEstado.RECIBIDO,
  cantidad: 2,
  nombre_user: 'Juan',
  userId: 1,
  fechaCreacion: new Date(),
  fechaActualizacion: new Date(),
  items: [],
};
    pedidosRepo.findOne.mockResolvedValue(pedido);

    const result = await service.findOne(1);
    expect(result).toEqual(pedido);
  });

  it('should throw if pedido not found', async () => {
    pedidosRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('should update a pedido and replace items', async () => {
    const existingPedido: Pedido = {
  id: 1,
  direccion: 'Calle 123',
  telefono: '123456789',
  estado: PedidoEstado.RECIBIDO,
  cantidad: 2,
  nombre_user: 'Juan',
  userId: 1,
  fechaCreacion: new Date(),
  fechaActualizacion: new Date(),
  items: [],
};
    const updateDto = {
      direccion: 'Nueva dirección',
      items: [
        {
          id: 2,
          nombre: 'Producto Actualizado',
          precio: 20,
          imagen_url: 'url2',
          tipo: 'rueda',
          cantidad: 1,
        },
      ],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(existingPedido);
    itemsRepo.delete.mockResolvedValue({ affected: 1 } as any);
    itemsRepo.create.mockImplementation((item) => item as PedidoItem);
    pedidosRepo.save.mockResolvedValue({
      ...existingPedido,
      ...updateDto,
    } as Pedido);

    const result = await service.update(1, updateDto);
    expect(result.items).toHaveLength(1);
  });

  it('should delete a pedido', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1 } as Pedido);
    pedidosRepo.delete.mockResolvedValue({ affected: 1 } as any);

    await service.remove(1);
    expect(pedidosRepo.delete).toHaveBeenCalledWith(1);
  });

  it('should return last pedido', async () => {
    const last : Pedido = {
  id: 5,
  direccion: 'Calle 123',
  telefono: '123456789',
  estado: PedidoEstado.RECIBIDO,
  cantidad: 2,
  nombre_user: 'Juan',
  userId: 1,
  fechaCreacion: new Date(),
  fechaActualizacion: new Date(),
  items: [],
};;
    pedidosRepo.find.mockResolvedValue([last]);

    const result = await service.findLast();
    expect(result).toEqual(last);
  });

  it('should throw if no pedidos found', async () => {
    pedidosRepo.find.mockResolvedValue([]);
    await expect(service.findLast()).rejects.toThrow(NotFoundException);
  });
});
