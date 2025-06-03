import { PartialType } from '@nestjs/mapped-types';
import { CreateRodamientoDto } from './create-rodamiento.dto';

export class UpdateRodamientoDto extends PartialType(CreateRodamientoDto) {}
