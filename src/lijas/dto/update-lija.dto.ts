import { PartialType } from '@nestjs/mapped-types';
import { CreateLijaDto } from './create-lija.dto';

export class UpdateLijaDto extends PartialType(CreateLijaDto) {}
