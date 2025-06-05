
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const userId = (req.user as any).sub;
    return this.authService.getProfile(userId);
  }
}
