import { Injectable } from '@nestjs/common';
import { Lija } from './entities/lija.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LijasService {
constructor(
    @InjectRepository(Lija)
    private lijasRepo: Repository<Lija>,
  ) {}

  create(data: Partial<Lija>) {
    const lija= this.lijasRepo.create(data);
    return this.lijasRepo.save(lija);
  }

  findAll() {
    return this.lijasRepo.find();
  }

  findOne(id: number) {
    return this.lijasRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Lija>) {
    return this.lijasRepo.update(id, data);
  }

  remove(id: number) {
    return this.lijasRepo.delete(id);
  }
}
