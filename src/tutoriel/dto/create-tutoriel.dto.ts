import { IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"
import { CreateRessourceDto } from "src/ressources/dto/create-ressource.dto"

export class CreateTutorielDto  extends CreateRessourceDto{
    type:string
    @IsString()
    @IsNotEmpty()
     niveau:string
     @IsString()
     @IsNotEmpty()
     duree:string
     video:string
     ressource: Types.ObjectId
     club: Types.ObjectId;

}
