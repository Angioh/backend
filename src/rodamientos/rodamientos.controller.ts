import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RodamientosService } from './rodamientos.service';
import { CreateRodamientoDto } from './dto/create-rodamiento.dto';
import { UpdateRodamientoDto } from './dto/update-rodamiento.dto';

@Controller('rodamientos')
export class RodamientosController {
  constructor(private readonly rodamientosService: RodamientosService) {}

  @Post()
  create(@Body() createRodamientoDto: CreateRodamientoDto) {
    return this.rodamientosService.create(createRodamientoDto);
  }

  @Get()
  findAll() {
    return this.rodamientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rodamientosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRodamientoDto: UpdateRodamientoDto) {
    return this.rodamientosService.update(+id, updateRodamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rodamientosService.remove(+id);
  }
}
