import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TornillosService } from './tornillos.service';
import { Tornillo } from './entities/tornillo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/users/user.entity';

@Controller('tornillos')
export class TornillosController {
  constructor(private readonly tornillosService: TornillosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  create(@Body() data: Partial<Tornillo>) {
    return this.tornillosService.create(data);
  }

  @Get()
  findAll() {
    return this.tornillosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tornillosService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() data: Partial<Tornillo>) {
    return this.tornillosService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.tornillosService.remove(Number(id));
  }
}
