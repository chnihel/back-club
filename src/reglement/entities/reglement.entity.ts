import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Ressource } from "src/ressources/entities/ressource.entity";

@Schema()
export class Reglement extends Ressource{
    type:string
    @Prop()
    version: string
      @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'club'})
       club: Types.ObjectId;
}
export const reglementSchema = SchemaFactory.createForClass(Reglement)
