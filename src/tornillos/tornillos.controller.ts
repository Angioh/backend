import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TornillosService } from './tornillos.service';
import { Tornillo } from './entities/tornillo.entity';

@Controller('tornillos')
export class TornillosController {
  constructor(private readonly tornillosService: TornillosService) {}

  @Post()
  create(@Body() data: Partial<Tornillo>) {
    return this.tornillosService.create(data);
  }

  @Get()
  findAll() {
    return this.tornillosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tornillosService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Tornillo>) {
    return this.tornillosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tornillosService.remove(Number(id));
  }
}
