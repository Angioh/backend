import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TablasService } from './tablas.service';
import { Tabla } from './entities/tabla.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('tablas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TablasController {
  constructor(private readonly tablasService: TablasService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() data: Partial<Tabla>) {
    return this.tablasService.create(data);
  }

  @Get()
  findAll() {
    return this.tablasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablasService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() data: Partial<Tabla>) {
    return this.tablasService.update(Number(id), data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.tablasService.remove(Number(id));
  }
}
