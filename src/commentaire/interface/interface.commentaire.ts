import { Document } from "mongoose";

export interface Icommentaire extends Document{
    readonly content:string
}