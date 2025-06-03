import { Injectable } from '@nestjs/common';
import { CreateRuedaDto } from './dto/create-rueda.dto';
import { UpdateRuedaDto } from './dto/update-rueda.dto';

@Injectable()
export class RuedasService {
  create(createRuedaDto: CreateRuedaDto) {
    return 'This action adds a new rueda';
  }

  findAll() {
    return `This action returns all ruedas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rueda`;
  }

  update(id: number, updateRuedaDto: UpdateRuedaDto) {
    return `This action updates a #${id} rueda`;
  }

  remove(id: number) {
    return `This action removes a #${id} rueda`;
  }
}
