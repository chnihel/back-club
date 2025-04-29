import { IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose";

export class CreateRessourceDto {
    @IsString()
    @IsNotEmpty()
    titre: string
    @IsString()
    @IsNotEmpty()
    type: string
    @IsString()
    @IsNotEmpty()
    contenu: string
    derigeantClub: Types.ObjectId;
    guide: Types.ObjectId[]
    reglement: Types.ObjectId[]
    tutoriel: Types.ObjectId[]
    multimedia: Types.ObjectId[]

}
