import { IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateTutorielDto {
    @IsString()
    @IsNotEmpty()
     niveau:string
     @IsString()
     @IsNotEmpty()
     duree:string
     video:string
     ressource: Types.ObjectId
}
