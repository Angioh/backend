import { Injectable } from '@nestjs/common';
import { CreateRodamientoDto } from './dto/create-rodamiento.dto';
import { UpdateRodamientoDto } from './dto/update-rodamiento.dto';

@Injectable()
export class RodamientosService {
  create(createRodamientoDto: CreateRodamientoDto) {
    return 'This action adds a new rodamiento';
  }

  findAll() {
    return `This action returns all rodamientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rodamiento`;
  }

  update(id: number, updateRodamientoDto: UpdateRodamientoDto) {
    return `This action updates a #${id} rodamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} rodamiento`;
  }
}
