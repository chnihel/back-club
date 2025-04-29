import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Commentaire {
    @Prop()
   content:string
}
export const commentaireSchema=SchemaFactory.createForClass(Commentaire)
