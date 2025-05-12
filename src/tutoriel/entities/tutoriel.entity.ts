import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Ressource } from "src/ressources/entities/ressource.entity";

@Schema()
export class Tutoriel extends Ressource {
    type: string
    @Prop()
    niveau: string
    @Prop()
    duree: string
    @Prop()
    video: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'club' })
    club: Types.ObjectId;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'commentaire' }], default: [] })
    commentaire: Types.ObjectId[]


}

export const tutorielSchema = SchemaFactory.createForClass(Tutoriel)
