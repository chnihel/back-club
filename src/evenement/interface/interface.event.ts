import { Document, Types } from "mongoose";

export interface Ievenement extends Document{
   readonly nomEvent:string
   readonly dateEvent:Date
   readonly lieuEvent:string
    derigeantClub: Types.ObjectId;
    club: Types.ObjectId;

   

}