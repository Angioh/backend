import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RodamientosService } from './rodamientos.service';
import { Rodamiento } from './entities/rodamiento.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/users/user.entity';

@Controller('rodamientos')
export class RodamientosController {
  constructor(private readonly rodamientosService: RodamientosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() data: Partial<Rodamiento>) {
    return this.rodamientosService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.rodamientosService.remove(Number(id));
  }
}
