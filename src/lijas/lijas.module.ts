import { Module } from '@nestjs/common';
import { LijasService } from './lijas.service';
import { LijasController } from './lijas.controller';

@Module({
  controllers: [LijasController],
  providers: [LijasService],
})
export class LijasModule {}
