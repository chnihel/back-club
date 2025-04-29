import { PartialType } from '@nestjs/mapped-types';
import { CreateMutimediaDto } from './create-mutimedia.dto';

export class UpdateMutimediaDto extends PartialType(CreateMutimediaDto) {}
