import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Ressource } from "src/ressources/entities/ressource.entity";

@Schema({timestamps:true})
export class Guide extends Ressource {
    type:string
    @Prop()
    category:string
    @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'club'})
    club: Types.ObjectId;


}
export const GuideSchema=SchemaFactory.createForClass(Guide)