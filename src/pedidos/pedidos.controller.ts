import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() data: Partial<Pedido>) {
    return this.pedidosService.create(data);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Pedido>) {
    return this.pedidosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(Number(id));
  }
}
