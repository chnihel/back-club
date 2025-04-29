import { Document, Types } from "mongoose";

export interface IGuide extends Document{
    category:string
ressource: Types.ObjectId
}