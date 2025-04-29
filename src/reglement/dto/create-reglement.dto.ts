import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateReglementDto {
    @IsString()
    @IsNotEmpty()
    version:string
        ressource: Types.ObjectId
    

}
