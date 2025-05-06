import { Document, Types } from "mongoose";
import { IRessource } from "src/ressources/interface/interface.ressource";

export interface ITutoriel extends IRessource{
   type:string
   readonly niveau:string
   readonly duree:string
   video:string
   ressource: Types.ObjectId
   club: Types.ObjectId;

}