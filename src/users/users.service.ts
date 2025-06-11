// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
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
    if (
      data.role !== undefined &&
      Object.values(UserRole).includes(data.role as UserRole)
    ) {
      role = data.role as UserRole;
    }


    const userEntity = this.usersRepo.create({
      email: data.email,
      password: data.password,
      role: role,
      nombre: data.nombre,
      apellido: data.apellido,
      direccion: data.direccion ?? null,
      telefono: data.telefono ?? null,
    });
    return await this.usersRepo.save(userEntity);
  }


  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepo.findOne({ where: { email } });
  }


  async findAll(): Promise<User[]> {
    return await this.usersRepo.find();
  }


  async findOne(id: number): Promise<User | null> {
    return await this.usersRepo.findOne({ where: { id } });
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

    const partial: Partial<User> = { id };

    if (data.email !== undefined) {
      partial.email = data.email;
    }
    if (data.password !== undefined) {
      partial.password = data.password;
    }
    if (
      data.role !== undefined &&
      Object.values(UserRole).includes(data.role as UserRole)
    ) {
      partial.role = data.role as UserRole;
    }
    if (data.nombre !== undefined) {
      partial.nombre = data.nombre;
    }
    if (data.apellido !== undefined) {
      partial.apellido = data.apellido;
    }
    if (data.direccion !== undefined) {
      partial.direccion = data.direccion;
    }
    if (data.telefono !== undefined) {
      partial.telefono = data.telefono;
    }

    const entityToUpdate = await this.usersRepo.preload(partial);
    if (!entityToUpdate) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return await this.usersRepo.save(entityToUpdate);
  }


  async remove(id: number): Promise<void> {
    const userToRemove = await this.usersRepo.findOne({ where: { id } });
    if (!userToRemove) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    await this.usersRepo.remove(userToRemove);
  }
}
