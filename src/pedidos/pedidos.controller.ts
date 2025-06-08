// src/pedidos/pedidos.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(@Body() data: any): Promise<Pedido> {
    return this.pedidosService.create(data);
  }

  @Get()
  async findAll(): Promise<Pedido[]> {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pedido> {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<Pedido> {
    return this.pedidosService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.pedidosService.remove(+id);
  }
}
