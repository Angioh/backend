import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rueda } from './entities/rueda.entity';

@Injectable()
export class RuedasService {
 constructor(
     @InjectRepository(Rueda)
     private ruedasRepo: Repository<Rueda>,
   ) {}
 
   create(data: Partial<Rueda>) {
     const rueda = this.ruedasRepo.create(data);
     return this.ruedasRepo.save(rueda);
   }
 
   findAll() {
     return this.ruedasRepo.find();
   }
 
   findOne(id: number) {
     return this.ruedasRepo.findOne({ where: { id } });
   }
 
   update(id: number, data: Partial<Rueda>) {
     return this.ruedasRepo.update(id, data);
   }
 
   remove(id: number) {
     return this.ruedasRepo.delete(id);
   }
}
