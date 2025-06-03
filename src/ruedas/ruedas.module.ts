import { Module } from '@nestjs/common';
import { RuedasService } from './ruedas.service';
import { RuedasController } from './ruedas.controller';

@Module({
  controllers: [RuedasController],
  providers: [RuedasService],
})
export class RuedasModule {}
