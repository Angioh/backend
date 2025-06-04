import { Module } from '@nestjs/common';
import { TornillosService } from './tornillos.service';
import { TornillosController } from './tornillos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tornillo } from './entities/tornillo.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tornillo])],
  controllers: [TornillosController],
  providers: [TornillosService],
})
export class TornillosModule {}
