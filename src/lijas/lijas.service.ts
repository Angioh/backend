import { Injectable } from '@nestjs/common';
import { CreateLijaDto } from './dto/create-lija.dto';
import { UpdateLijaDto } from './dto/update-lija.dto';

@Injectable()
export class LijasService {
  create(createLijaDto: CreateLijaDto) {
    return 'This action adds a new lija';
  }

  findAll() {
    return `This action returns all lijas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lija`;
  }

  update(id: number, updateLijaDto: UpdateLijaDto) {
    return `This action updates a #${id} lija`;
  }

  remove(id: number) {
    return `This action removes a #${id} lija`;
  }
}
