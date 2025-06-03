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
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';
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
  create(@Body() createTablaDto: CreateTablaDto) {
    return this.tablasService.create(createTablaDto);
  }

  @Get()
  findAll() {
    return this.tablasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablasService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateTablaDto: UpdateTablaDto) {
    return this.tablasService.update(+id, updateTablaDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.tablasService.remove(+id);
  }
}
