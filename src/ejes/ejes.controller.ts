import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EjesService } from './ejes.service';
import { CreateEjeDto } from './dto/create-eje.dto';
import { UpdateEjeDto } from './dto/update-eje.dto';

@Controller('ejes')
export class EjesController {
  constructor(private readonly ejesService: EjesService) {}

  @Post()
  create(@Body() createEjeDto: CreateEjeDto) {
    return this.ejesService.create(createEjeDto);
  }

  @Get()
  findAll() {
    return this.ejesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjeDto: UpdateEjeDto) {
    return this.ejesService.update(+id, updateEjeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejesService.remove(+id);
  }
}
