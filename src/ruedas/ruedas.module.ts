import { Module } from '@nestjs/common';
import { RuedasService } from './ruedas.service';
import { RuedasController } from './ruedas.controller';
import { Rueda } from './entities/rueda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rueda])],
  controllers: [RuedasController],
  providers: [RuedasService],
})
export class RuedasModule {}
