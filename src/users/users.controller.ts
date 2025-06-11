
import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UsersService, } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
   async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: {
      email?: string;
      password?: string;
      role?: string;
      nombre?: string;
      apellido?: string;
      direccion?: string;
      telefono?: string;
    },
  ) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
