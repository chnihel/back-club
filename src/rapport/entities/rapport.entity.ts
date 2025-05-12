import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true})
export class Rapport {
    @Prop()
    description:string
 
        @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'club'})
        club: Types.ObjectId;
}
export const rapportSchema=SchemaFactory.createForClass(Rapport)
