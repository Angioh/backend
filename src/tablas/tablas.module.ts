import { Module } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { TablasController } from './tablas.controller';
import { Tabla } from './entities/tabla.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Tabla])],
  controllers: [TablasController],
  providers: [TablasService],
})
export class TablasModule {}
