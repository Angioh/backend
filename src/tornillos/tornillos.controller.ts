import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TornillosService } from './tornillos.service';
import { CreateTornilloDto } from './dto/create-tornillo.dto';
import { UpdateTornilloDto } from './dto/update-tornillo.dto';

@Controller('tornillos')
export class TornillosController {
  constructor(private readonly tornillosService: TornillosService) {}

  @Post()
  create(@Body() createTornilloDto: CreateTornilloDto) {
    return this.tornillosService.create(createTornilloDto);
  }

  @Get()
  findAll() {
    return this.tornillosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tornillosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTornilloDto: UpdateTornilloDto) {
    return this.tornillosService.update(+id, updateTornilloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tornillosService.remove(+id);
  }
}
