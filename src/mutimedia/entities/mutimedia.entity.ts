import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Ressource } from "src/ressources/entities/ressource.entity";

@Schema()
export class Mutimedia extends Ressource{
    type:string
    @Prop()
    format:string[]
     @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'club'})
    club: Types.ObjectId;
    
  
}
 export const multimediaSchema=SchemaFactory.createForClass(Mutimedia)
