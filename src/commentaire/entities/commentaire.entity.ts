import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true})
export class Commentaire {
    @Prop()
   content:string
   @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'ressource'})
    multimedia?: Types.ObjectId;
     @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'ressource'})
    tutoriel?: Types.ObjectId;
     @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'user'})
    membre: Types.ObjectId;
}
export const commentaireSchema=SchemaFactory.createForClass(Commentaire)
