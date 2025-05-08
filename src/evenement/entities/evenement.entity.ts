import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true})
export class Evenement {
    @Prop()
    nomEvent:string
    @Prop()
    dateEvent:Date
    @Prop()
    lieuEvent:string
    @Prop()
    frais:number
    @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'user'})
    derigeantClub: Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'club'})
    club: Types.ObjectId;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
    membres: Types.ObjectId[]


}
export const eventSchema=SchemaFactory.createForClass(Evenement)
