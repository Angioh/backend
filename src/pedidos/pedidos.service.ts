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

  /**
   * Crea un pedido junto con sus items (si vienen en data.items).
   */
  async create(data: any): Promise<Pedido> {
    const { items = [], ...pedidoData } = data;

    // Forzamos la sobrecarga correcta: tratamos pedidoData como DeepPartial<Pedido>,
    // luego casteamos a unknown y finalmente a Pedido.
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

  /**
   * Devuelve todos los pedidos cargando también la relación `items`.
   */
  async findAll(): Promise<Pedido[]> {
    return this.pedidosRepo.find({ relations: ['items'] });
  }

  /**
   * Devuelve un solo pedido (con sus items) o lanza NotFoundException.
   */
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!pedido) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    return pedido;
  }

  /**
   * Actualiza un pedido. Si llega data.items, reemplaza completamente los items.
   */
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

  /**
   * Elimina un pedido (y sus items por cascade).
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.pedidosRepo.delete(id);
  }
}
