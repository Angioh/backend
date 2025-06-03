import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuedasService } from './ruedas.service';
import { CreateRuedaDto } from './dto/create-rueda.dto';
import { UpdateRuedaDto } from './dto/update-rueda.dto';

@Controller('ruedas')
export class RuedasController {
  constructor(private readonly ruedasService: RuedasService) {}

  @Post()
  create(@Body() createRuedaDto: CreateRuedaDto) {
    return this.ruedasService.create(createRuedaDto);
  }

  @Get()
  findAll() {
    return this.ruedasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruedasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuedaDto: UpdateRuedaDto) {
    return this.ruedasService.update(+id, updateRuedaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruedasService.remove(+id);
  }
}
