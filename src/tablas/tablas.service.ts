import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tabla } from './entities/tabla.entity';

@Injectable()
export class TablasService {
  constructor(
      @InjectRepository(Tabla)
      private tablasRepo: Repository<Tabla>,
    ) {}
  
    create(data: Partial<Tabla>) {
      const tabla= this.tablasRepo.create(data);
      return this.tablasRepo.save(tabla);
    }
  
    findAll() {
      return this.tablasRepo.find();
    }
  
    findOne(id: number) {
      return this.tablasRepo.findOne({ where: { id } });
    }
  
    update(id: number, data: Partial<Tabla>) {
      return this.tablasRepo.update(id, data);
    }
  
    remove(id: number) {
      return this.tablasRepo.delete(id);
    }
}
