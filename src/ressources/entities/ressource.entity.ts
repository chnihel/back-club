import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true})
export class Ressource {
   @Prop()
   titre:string
   @Prop()
   type:string
   @Prop()
   contenu:string
    @Prop({ type: mongoose.Schema.Types.ObjectId,ref: 'user'})
    derigeantClub: Types.ObjectId;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'guide' }] })
    guide: Types.ObjectId[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reglement' }] })
    reglement: Types.ObjectId[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tutoriel' }] })
    tutoriel: Types.ObjectId[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'multimedia' }] })
    multimedia: Types.ObjectId[]
}
export const ressourceSchema=SchemaFactory.createForClass(Ressource)