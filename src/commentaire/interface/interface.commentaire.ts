import { Document, Types } from "mongoose";

export interface Icommentaire extends Document{
    readonly content:string
    multimedia?: Types.ObjectId;
    tutoriel?: Types.ObjectId;
     membre: Types.ObjectId;
}