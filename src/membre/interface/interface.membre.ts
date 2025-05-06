import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";

export interface IMembre extends IUser{
    role:string
    roleInClub?:string
    isPaid: boolean;
    isPaidEvent: boolean;

    club: Types.ObjectId[] 
    event: Types.ObjectId[]

}