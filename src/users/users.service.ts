// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

async create(data: { email: string; password: string; role?: string }) {
  let role: UserRole = UserRole.CLIENTE;
  if (data.role && Object.values(UserRole).includes(data.role as UserRole)) {
    role = data.role as UserRole;
  }
  const user = this.usersRepo.create({
    email: data.email,
    password: data.password,
    role
  });
  return this.usersRepo.save(user);
}

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
  return this.usersRepo.findOne({ where: { id } });
}

}

