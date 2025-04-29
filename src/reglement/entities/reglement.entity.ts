import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ timestamps: true })
export class Reglement {
    @Prop()
    version: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' })
    ressource: Types.ObjectId
}
export const reglementSchema = SchemaFactory.createForClass(Reglement)
