import { Document, Types } from "mongoose";

export interface Irappport extends  Document{
   readonly description:string
       club: Types.ObjectId;
}