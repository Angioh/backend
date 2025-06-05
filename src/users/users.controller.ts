// src/users/users.controller.ts
import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnerOrAdminGuard } from '../auth/owner-or-admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {

    return this.usersService.findOne(id);
  }

}
