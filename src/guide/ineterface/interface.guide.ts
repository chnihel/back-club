import { Document, Types } from "mongoose";
import { IRessource } from "src/ressources/interface/interface.ressource";

export interface IGuide extends IRessource{
    type:string
    category:string
    club: Types.ObjectId;

}