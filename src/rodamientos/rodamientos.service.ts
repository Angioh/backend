import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rodamiento } from './entities/rodamiento.entity';

@Injectable()
export class RodamientosService {
constructor(
    @InjectRepository(Rodamiento)
    private RodamientosRepo: Repository<Rodamiento>,
  ) {}

  create(data: Partial<Rodamiento>) {
    const rodamiento = this.RodamientosRepo.create(data);
    return this.RodamientosRepo.save(rodamiento);
  }

  findAll() {
    return this.RodamientosRepo.find();
  }

  findOne(id: number) {
    return this.RodamientosRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Rodamiento>) {
    return this.RodamientosRepo.update(id, data);
  }

  remove(id: number) {
    return this.RodamientosRepo.delete(id);
  }
}
