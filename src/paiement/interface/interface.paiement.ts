import { Document, Types } from "mongoose";
export interface Ipaiement extends Document{
club: Types.ObjectId;
membre: Types.ObjectId;
montant:number

}