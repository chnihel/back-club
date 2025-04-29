import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateMutimediaDto {
  
    format:string[]
            ressource: Types.ObjectId
    

}
