
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user-decorator';
import { User } from '../users/user.entity';

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

  /**
   * Al proteger con JwtAuthGuard, Passport ejecuta JwtStrategy.validate(),
   * que retorna la entidad User (sin contraseña). Entonces `@GetUser() user`
   * ya será un objeto con { id, email, role, nombre, apellido }.
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: User) {
    // user ya es la entidad completa (sin password).
    return user;
  }
}
