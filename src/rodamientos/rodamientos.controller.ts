import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RodamientosService } from './rodamientos.service';
import { Rodamiento } from './entities/rodamiento.entity';

@Controller('rodamientos')
export class RodamientosController {
  constructor(private readonly rodamientosService: RodamientosService) {}

  @Post()
  create(@Body() data: Partial<Rodamiento>) {
    return this.rodamientosService.create(data);
  }

  @Get()
  findAll() {
    return this.rodamientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rodamientosService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Rodamiento>) {
    return this.rodamientosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rodamientosService.remove(Number(id));
  }
}
