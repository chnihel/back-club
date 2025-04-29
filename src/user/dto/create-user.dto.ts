import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
     
        @IsString()
        @IsNotEmpty()
        nom: string
    
        @IsString()
        @IsNotEmpty()
        prenom: string
        @IsString()
        @IsNotEmpty()
        email: string
        @IsString()
        @IsNotEmpty()
        password: string
        @IsDateString()
        @IsNotEmpty()
        dateNaissance:Date
        @IsNumber()
        @IsNotEmpty()
        telephone: number
        @IsString()
        @IsNotEmpty()
        adresse:string
        @IsString()
        @IsNotEmpty()
        faculte : string
        @IsString()
        @IsNotEmpty()
        sexe : string
        
        @IsString()
        @IsNotEmpty()
        origine : string
       
        image : string
        code:string
       
        refreshToken: string
       

        verifyEmail: boolean
}
