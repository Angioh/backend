// src/auth/auth.service.ts

import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    nombre: string,
  apellido: string,
  email: string,
  password: string,
  role: string = 'cliente'
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      role,
      
    });
  }


  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, role: user.role, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: number) {

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
