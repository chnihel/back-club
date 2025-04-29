import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorielDto } from './create-tutoriel.dto';

export class UpdateTutorielDto extends PartialType(CreateTutorielDto) {}
