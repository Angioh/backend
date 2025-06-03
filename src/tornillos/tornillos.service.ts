import { Injectable } from '@nestjs/common';
import { CreateTornilloDto } from './dto/create-tornillo.dto';
import { UpdateTornilloDto } from './dto/update-tornillo.dto';

@Injectable()
export class TornillosService {
  create(createTornilloDto: CreateTornilloDto) {
    return 'This action adds a new tornillo';
  }

  findAll() {
    return `This action returns all tornillos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tornillo`;
  }

  update(id: number, updateTornilloDto: UpdateTornilloDto) {
    return `This action updates a #${id} tornillo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tornillo`;
  }
}
