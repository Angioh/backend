import { Module } from '@nestjs/common';
import { RodamientosService } from './rodamientos.service';
import { RodamientosController } from './rodamientos.controller';

@Module({
  controllers: [RodamientosController],
  providers: [RodamientosService],
})
export class RodamientosModule {}
