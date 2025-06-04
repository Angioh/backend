import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EjesService } from './ejes.service';
import { Eje } from './entities/eje.entity';

@Controller('ejes')
export class EjesController {
  constructor(private readonly ejesService: EjesService) {}

  @Post()
  create(@Body() data: Partial<Eje>) {
    return this.ejesService.create(data);
  }

  @Get()
  findAll() {
    return this.ejesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejesService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Eje>) {
    return this.ejesService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejesService.remove(Number(id));
  }
}
