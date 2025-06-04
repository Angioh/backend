import { Module } from '@nestjs/common';
import { EjesService } from './ejes.service';
import { EjesController } from './ejes.controller';
import { Eje } from './entities/eje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Eje])],
  controllers: [EjesController],
  providers: [EjesService],
})
export class EjesModule {}
