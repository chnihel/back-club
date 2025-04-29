import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateEvenementDto {
    @IsString()
     @IsNotEmpty()
     nomEvent:string
     @IsDateString()
     @IsNotEmpty()
     dateEvent:Date
     @IsString()
     @IsNotEmpty()
     lieuEvent:string
    derigeantClub: Types.ObjectId;
    club: Types.ObjectId;

     
    }
