import { Document, Types } from "mongoose";

export interface ITutoriel extends Document{
   readonly niveau:string
   readonly duree:string
   video:string
   ressource: Types.ObjectId
}