import { Injectable } from '@nestjs/common';
import { CreateEjeDto } from './dto/create-eje.dto';
import { UpdateEjeDto } from './dto/update-eje.dto';

@Injectable()
export class EjesService {
  create(createEjeDto: CreateEjeDto) {
    return 'This action adds a new eje';
  }

  findAll() {
    return `This action returns all ejes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eje`;
  }

  update(id: number, updateEjeDto: UpdateEjeDto) {
    return `This action updates a #${id} eje`;
  }

  remove(id: number) {
    return `This action removes a #${id} eje`;
  }
}
