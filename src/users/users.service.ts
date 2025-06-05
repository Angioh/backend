// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}


  async create(data: {
    email: string;
    password: string;
    role?: string;
    nombre: string;
    apellido: string;
    direccion?: string;
    telefono?: string;
  }): Promise<User> {
    let role: UserRole = UserRole.CLIENTE;
    if (data.role && Object.values(UserRole).includes(data.role as UserRole)) {
      role = data.role as UserRole;
    }

    const user = this.usersRepo.create({
      email: data.email,
      password: data.password,
      role,
      nombre: data.nombre,
      apellido: data.apellido,
      direccion: data.direccion ?? null,
      telefono: data.telefono ?? null,
    });

    return this.usersRepo.save(user);
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }


  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }


  async findOne(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }


  async update(
    id: number,
    data: {
      email?: string;
      password?: string;
      role?: string;
      nombre?: string;
      apellido?: string;
      direccion?: string;
      telefono?: string;
    },
  ): Promise<User> {
    // Preload conflige los datos nuevos en la entidad existente
    const toUpdate = await this.usersRepo.preload({
      id,
      ...data,
    });
    if (!toUpdate) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return this.usersRepo.save(toUpdate);
  }

  /**
   * Elimina un usuario por ID.
   */
  async remove(id: number): Promise<void> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    await this.usersRepo.remove(user);
  }
}
