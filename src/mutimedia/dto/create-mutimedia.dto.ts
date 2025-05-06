import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateRessourceDto } from "src/ressources/dto/create-ressource.dto";

export class CreateMutimediaDto extends CreateRessourceDto {
  type:string
    format:string[]
    club: Types.ObjectId;


}
