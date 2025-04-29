import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";

export interface IMembre extends IUser{
    role:string
    club: Types.ObjectId[] 
}