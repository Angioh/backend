import { Module } from '@nestjs/common';
import { RodamientosService } from './rodamientos.service';
import { RodamientosController } from './rodamientos.controller';
import { Rodamiento } from './entities/rodamiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Rodamiento])],
  controllers: [RodamientosController],
  providers: [RodamientosService],
})
export class RodamientosModule {}
