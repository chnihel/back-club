import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateClubDto {
    @IsString()
    @IsNotEmpty()
    nomClub: string
    @IsString()
    @IsNotEmpty()
    description: string
    logo:string
    derigentClub: Types.ObjectId
    membres: Types.ObjectId[]
    evenement: Types.ObjectId[]  



}
