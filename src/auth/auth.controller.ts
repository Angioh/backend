import { Controller, Post, Body,Get,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user-decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('register')
async register(@Body() body: { email: string; password: string; role?: string }) {
  return this.authService.register(body.email, body.password, body.role);
}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user) {
    // Devuelve el usuario autenticado (puedes omitir la contraseña)
    if (user && user.password) delete user.password;
    return user;
  }
}
