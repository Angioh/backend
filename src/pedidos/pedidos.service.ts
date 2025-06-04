import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido, PedidoEstado } from './pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepo: Repository<Pedido>,
  ) {}

  create(data: Partial<Pedido>) {
    const pedido = this.pedidosRepo.create(data);
    return this.pedidosRepo.save(pedido);
  }

  findAll() {
    return this.pedidosRepo.find();
  }

  findOne(id: number) {
    return this.pedidosRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Pedido>) {
    return this.pedidosRepo.update(id, data);
  }

  remove(id: number) {
    return this.pedidosRepo.delete(id);
  }
}
