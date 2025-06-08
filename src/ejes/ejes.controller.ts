import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EjesService } from './ejes.service';
import { Eje } from './entities/eje.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/user.entity';

@Controller('ejes')
export class EjesController {
  constructor(private readonly ejesService: EjesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() data: Partial<Eje>) {
    return this.ejesService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.ejesService.remove(Number(id));
  }
}
