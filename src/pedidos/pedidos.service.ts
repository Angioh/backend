// src/pedidos/pedidos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoItem } from './pedido-item.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepo: Repository<Pedido>,
    @InjectRepository(PedidoItem)
    private itemsRepo: Repository<PedidoItem>,
  ) {}


  async create(data: any): Promise<Pedido> {
    const { items = [], ...pedidoData } = data;

    const pedido = this.pedidosRepo.create(
      pedidoData as DeepPartial<Pedido>,
    ) as unknown as Pedido;

    pedido.items = items.map(i =>
      this.itemsRepo.create({
        productoId: i.id,
        nombre: i.nombre,
        precio: i.precio,
        imagen_url: i.imagen_url,
        tipo: i.tipo,
        cantidad: i.cantidad,
      }),
    );

    return this.pedidosRepo.save(pedido);
  }


  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepo.find({ relations: ['items'] });
  }

 
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!pedido) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    return pedido;
  }
 async findLast(): Promise<Pedido> {
    const pedidos = await this.pedidosRepo.find({
      order: { id: 'DESC' },
      relations: ['items'],
      take: 1,
    });
    if (pedidos.length === 0) {
      throw new NotFoundException('No hay pedidos registrados aún');
    }
    return pedidos[0];
  }
 
  async update(id: number, data: any): Promise<Pedido> {
    const pedido = await this.findOne(id);
    const { items, ...pedidoData } = data;

    Object.assign(pedido, pedidoData);

    if (Array.isArray(items)) {
      await this.itemsRepo.delete({ pedido: { id } });
      pedido.items = items.map(i =>
        this.itemsRepo.create({
          productoId: i.id,
          nombre: i.nombre,
          precio: i.precio,
          imagen_url: i.imagen_url,
          tipo: i.tipo,
          cantidad: i.cantidad,
        }),
      );
    }

    return this.pedidosRepo.save(pedido);
  }


  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.pedidosRepo.delete(id);
  }
}
