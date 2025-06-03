import { Module } from '@nestjs/common';
import { TornillosService } from './tornillos.service';
import { TornillosController } from './tornillos.controller';

@Module({
  controllers: [TornillosController],
  providers: [TornillosService],
})
export class TornillosModule {}
