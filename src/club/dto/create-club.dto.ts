import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";


export class MembreBureauDto {
    @IsString()
    @IsNotEmpty()
    nom: string;
  
    @IsString()
    @IsNotEmpty()
    role: string;
  
    @IsString()
    @IsNotEmpty()
    image: string; 
  }
export class CreateClubDto {
    @IsString()
    @IsNotEmpty()
    nomClub: string
    @IsString()
    @IsNotEmpty()
    description: string
    @Type(()=>Number)
    cotisation:number

    @IsString()
    @IsNotEmpty()
    mission:string
    @IsString()
    @IsNotEmpty()
    vision:string
    @IsString()
    @IsNotEmpty()
    objectifs:string
    @IsString()
    @IsNotEmpty()
    activitePrincipale:string
    logo:string
    derigentClub: Types.ObjectId
    membres: Types.ObjectId[]
    evenement: Types.ObjectId[]  
    @IsBoolean()
    status: boolean

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MembreBureauDto)
    membresBureau: MembreBureauDto[];
    multimedia: Types.ObjectId[]
    tutoriel: Types.ObjectId[]
    guide: Types.ObjectId[]
    reglement: Types.ObjectId[]


}
