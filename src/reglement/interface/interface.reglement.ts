import { Document, Types } from "mongoose";

export interface IReglement extends Document{
   readonly version:string
   ressource: Types.ObjectId
   

}