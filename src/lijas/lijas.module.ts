import { Module } from '@nestjs/common';
import { LijasService } from './lijas.service';
import { LijasController } from './lijas.controller';
import { Lija } from './entities/lija.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Lija])],
  controllers: [LijasController],
  providers: [LijasService],
})
export class LijasModule {}
