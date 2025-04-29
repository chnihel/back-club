import { Document, Types } from "mongoose";

export interface IMultimedia extends Document{
   readonly format:string[]
           ressource: Types.ObjectId
   

}