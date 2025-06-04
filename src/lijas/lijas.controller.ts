import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LijasService } from './lijas.service';
import { Lija } from './entities/lija.entity';

@Controller('lijas')
export class LijasController {
  constructor(private readonly lijasService: LijasService) {}

  @Post()
  create(@Body() data: Partial<Lija>) {
    return this.lijasService.create(data);
  }

  @Get()
  findAll() {
    return this.lijasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lijasService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Lija>) {
    return this.lijasService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lijasService.remove(Number(id));
  }
}
