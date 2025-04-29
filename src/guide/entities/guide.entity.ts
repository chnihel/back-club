import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true})
export class Guide {
    @Prop()
    category:string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ressource'})
    ressource: Types.ObjectId

}
export const GuideSchema=SchemaFactory.createForClass(Guide)