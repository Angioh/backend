import { Module } from '@nestjs/common';
import { EjesService } from './ejes.service';
import { EjesController } from './ejes.controller';

@Module({
  controllers: [EjesController],
  providers: [EjesService],
})
export class EjesModule {}
