import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Eje } from './entities/eje.entity';

@Injectable()
export class EjesService {
constructor(
    @InjectRepository(Eje)
    private ejesRepo: Repository<Eje>,
  ) {}

  create(data: Partial<Eje>) {
    const eje = this.ejesRepo.create(data);
    return this.ejesRepo.save(eje);
  }

  findAll() {
    return this.ejesRepo.find();
  }

  findOne(id: number) {
    return this.ejesRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Eje>) {
    return this.ejesRepo.update(id, data);
  }

  remove(id: number) {
    return this.ejesRepo.delete(id);
  }
}
