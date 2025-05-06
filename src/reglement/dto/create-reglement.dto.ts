import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateRessourceDto } from "src/ressources/dto/create-ressource.dto";

export class CreateReglementDto extends CreateRessourceDto {
    type:string
    @IsString()
    @IsNotEmpty()
    version:string
    club: Types.ObjectId;


}
