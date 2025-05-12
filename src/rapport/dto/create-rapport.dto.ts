import { IsNotEmpty, IsString } from "class-validator";
import { Document, Types } from "mongoose";

export class CreateRapportDto  extends Document{
    @IsString()
    @IsNotEmpty()
    description:string
            club: Types.ObjectId;

}
