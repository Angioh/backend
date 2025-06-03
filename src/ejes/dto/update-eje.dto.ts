import { PartialType } from '@nestjs/mapped-types';
import { CreateEjeDto } from './create-eje.dto';

export class UpdateEjeDto extends PartialType(CreateEjeDto) {}
