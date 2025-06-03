import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LijasService } from './lijas.service';
import { CreateLijaDto } from './dto/create-lija.dto';
import { UpdateLijaDto } from './dto/update-lija.dto';

@Controller('lijas')
export class LijasController {
  constructor(private readonly lijasService: LijasService) {}

  @Post()
  create(@Body() createLijaDto: CreateLijaDto) {
    return this.lijasService.create(createLijaDto);
  }

  @Get()
  findAll() {
    return this.lijasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lijasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLijaDto: UpdateLijaDto) {
    return this.lijasService.update(+id, updateLijaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lijasService.remove(+id);
  }
}
