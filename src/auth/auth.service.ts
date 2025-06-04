import { Injectable, UnauthorizedException } from '@nestjs/common';
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

async register(email: string, password: string, role: string = 'cliente', nombre: string, apellido: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return this.usersService.create({ email, password: hashedPassword, role });
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
}
