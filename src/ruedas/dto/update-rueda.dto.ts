import { PartialType } from '@nestjs/mapped-types';
import { CreateRuedaDto } from './create-rueda.dto';

export class UpdateRuedaDto extends PartialType(CreateRuedaDto) {}
