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

  /**
   * Crea un nuevo usuario. Los campos 'direccion' y 'telefono' son opcionales.
   */
  async create(data: {
    email: string;
    password: string;
    role?: string;
    nombre: string;
    apellido: string;
    direccion?: string;
    telefono?: string;
  }): Promise<User> {
    // 1) Determinar el rol (por defecto CLIENTE)
    let role: UserRole = UserRole.CLIENTE;
    if (data.role && Object.values(UserRole).includes(data.role as UserRole)) {
      role = data.role as UserRole;
    }

    // 2) Construir la entidad User
    const userEntity = this.usersRepo.create({
      email: data.email,
      password: data.password,
      role: role,
      nombre: data.nombre,
      apellido: data.apellido,
      direccion: data.direccion ?? null,
      telefono: data.telefono ?? null,
    });

    // 3) Guardar en la base de datos (save recibe un solo objeto User, no un arreglo)
    return this.usersRepo.save(userEntity);
  }

  /**
   * Busca un usuario por email. Retorna null si no existe.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  /**
   * Devuelve todos los usuarios. Incluye 'direccion' y 'telefono' si existen.
   */
  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  /**
   * Busca un usuario por su ID. Retorna null si no existe.
   */
  async findOne(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  /**
   * Actualiza parcialmente un usuario existente.
   * Cualquier campo (email, password, role, nombre, apellido, direccion, telefono) 
   * puede ir en 'data'. Solo incluimos en el preload aquello que venga definido.
   */
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
    // 1) Precargamos la entidad con los nuevos valores. Convertimos 'role' a UserRole
    //    solo si data.role está definido y corresponde a un UserRole válido.

    const partial: Partial<User> = { id };

    if (data.email !== undefined) {
      partial.email = data.email;
    }
    if (data.password !== undefined) {
      partial.password = data.password;
    }
    if (data.role !== undefined && Object.values(UserRole).includes(data.role as UserRole)) {
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

    // 2) Guardamos los cambios. save recibe un solo objeto User.
    return this.usersRepo.save(entityToUpdate);
  }

  /**
   * Elimina un usuario por ID. Lanza NotFoundException si no existe.
   */
  async remove(id: number): Promise<void> {
    const userToRemove = await this.usersRepo.findOne({ where: { id } });
    if (!userToRemove) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    await this.usersRepo.remove(userToRemove);
  }
}
