import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";

export interface Iderigeant extends IUser{
    role:string
    club:Types.ObjectId[]  
    evenement: Types.ObjectId[]  
    ressource: Types.ObjectId[]  
  
    
}