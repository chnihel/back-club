import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateDerigeantClubDto extends CreateUserDto {
    role: string 
   
    club:Types.ObjectId[] 
    evenement: Types.ObjectId[]  
    ressource: Types.ObjectId[]  
  

     
    
}
