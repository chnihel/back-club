import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema()
export class Mutimedia {
    @Prop()
    format:string[]
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' })
        ressource: Types.ObjectId
}
 export const multimediaSchema=SchemaFactory.createForClass(Mutimedia)
