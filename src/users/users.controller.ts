// src/users/users.controller.ts

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from './user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

 @Get(':id')
@Roles(UserRole.ADMIN)
findOne(@Param('id') id: string): Promise<User | null> {
  return this.usersService.findOne(+id);
}

}
