import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
