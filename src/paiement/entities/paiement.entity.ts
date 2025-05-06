import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
@Schema({timestamps:true})
export class Paiement {
    @Prop()
    montant:number
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'club'})
    club: Types.ObjectId; 
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}]})
    membre: Types.ObjectId; 
}
export const paiementschema=SchemaFactory.createForClass(Paiement)
