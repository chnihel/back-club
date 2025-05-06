import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({timestamps:true,discriminatorKey:"type"})
export class Ressource {
   @Prop()
   titre:string
   @Prop()
   contenu:string

}
export const ressourceSchema=SchemaFactory.createForClass(Ressource)