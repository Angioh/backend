import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Tornillo } from './entities/tornillo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TornillosService {
constructor(
    @InjectRepository(Tornillo)
    private tornillosRepo: Repository<Tornillo>,
  ) {}

  create(data: Partial<Tornillo>) {
    const tornillo= this.tornillosRepo.create(data);
    return this.tornillosRepo.save(tornillo);
  }

  findAll() {
    return this.tornillosRepo.find();
  }

  findOne(id: number) {
    return this.tornillosRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Tornillo>) {
    return this.tornillosRepo.update(id, data);
  }

  remove(id: number) {
    return this.tornillosRepo.delete(id);
  }
}
