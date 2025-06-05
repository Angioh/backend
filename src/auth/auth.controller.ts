// src/auth/auth.controller.ts

import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user-decorator'; // Asegúrate de que corresponde a tu archivo

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: {
      email: string;
      password: string;
      role?: string;
      nombre: string;
      apellido: string;
    }
  ) {
    return this.authService.register(
      body.email,
      body.password,
      body.role,
      body.nombre,
      body.apellido
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // Usamos GetUser para inyectar directamente el objeto 'user' 
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@GetUser() user: any) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
