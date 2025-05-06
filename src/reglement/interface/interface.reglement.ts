import { Document, Types } from "mongoose";
import { IRessource } from "src/ressources/interface/interface.ressource";

export interface IReglement extends IRessource{
   type:string
   readonly version:string
   club: Types.ObjectId;


}