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
    @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'user'})
    derigeantClub: Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'club'})
    club: Types.ObjectId;


}
export const eventSchema=SchemaFactory.createForClass(Evenement)
