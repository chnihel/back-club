import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true})
export class Tutoriel {
    @Prop()
    niveau:string
    @Prop()
    duree:string
    @Prop()
    video:string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' })
    ressource: Types.ObjectId
}
export const tutorielSchema=SchemaFactory.createForClass(Tutoriel)
