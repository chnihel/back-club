import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateRessourceDto } from "src/ressources/dto/create-ressource.dto";

export class CreateGuideDto extends CreateRessourceDto {
    type:string
    @IsString()
    @IsNotEmpty()
    category:string
    club: Types.ObjectId;

}
