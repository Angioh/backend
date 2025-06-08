import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RuedasService } from './ruedas.service';
import { Rueda } from './entities/rueda.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/users/user.entity';

@Controller('ruedas')
export class RuedasController {
  constructor(private readonly ruedasService: RuedasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() data: Partial<Rueda>) {
    return this.ruedasService.update(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.ruedasService.remove(Number(id));
  }
}
