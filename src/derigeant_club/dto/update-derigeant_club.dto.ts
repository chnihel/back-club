import { PartialType } from '@nestjs/mapped-types';
import { CreateDerigeantClubDto } from './create-derigeant_club.dto';

export class UpdateDerigeantClubDto extends PartialType(CreateDerigeantClubDto) {}
