import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuedasService } from './ruedas.service';
import { Rueda } from './entities/rueda.entity';

@Controller('ruedas')
export class RuedasController {
  constructor(private readonly ruedasService: RuedasService) {}

  @Post()
  create(@Body() data: Partial<Rueda>) {
    return this.ruedasService.create(data);
  }

  @Get()
  findAll() {
    return this.ruedasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruedasService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Rueda>) {
    return this.ruedasService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruedasService.remove(Number(id));
  }
}
