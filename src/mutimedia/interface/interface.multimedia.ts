import { Document, Types } from "mongoose";
import { IRessource } from "src/ressources/interface/interface.ressource";

export interface IMultimedia extends IRessource{
        type:string
   readonly format:string[]
   club: Types.ObjectId;


}