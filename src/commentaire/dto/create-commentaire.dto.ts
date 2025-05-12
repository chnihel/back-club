import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateCommentaireDto {
    @IsString()
    @IsNotEmpty()
    content:string
    multimedia?: Types.ObjectId;
    tutoriel?: Types.ObjectId;
     membre: Types.ObjectId;
}
