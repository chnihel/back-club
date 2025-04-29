import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateGuideDto {
    @IsString()
    @IsNotEmpty()
    category:string
    ressource: Types.ObjectId
}
