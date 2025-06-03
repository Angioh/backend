import { PartialType } from '@nestjs/mapped-types';
import { CreateTornilloDto } from './create-tornillo.dto';

export class UpdateTornilloDto extends PartialType(CreateTornilloDto) {}
