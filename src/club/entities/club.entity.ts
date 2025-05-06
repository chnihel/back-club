import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";


@Schema()
export class MembreBureau {
     @Prop()
     nom: string;

     @Prop()
     role: string;

     @Prop()
     image: string;
}
const MembreBureauSchema = SchemaFactory.createForClass(MembreBureau);

@Schema()
export class Club {
     @Prop()
     nomClub: string
     @Prop()
     description: string
     @Prop()
     logo: string
     @Prop()
     cotisation: number
     @Prop()
     mission: string
     @Prop()
     vision: string
     @Prop()
     objectifs: string
     @Prop()
     activitePrincipale: string
     @Prop({ default: false })
     status: boolean
     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
     derigentClub: Types.ObjectId
     @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
     membres: Types.ObjectId[]
     @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }] })
     evenement: Types.ObjectId[]
     @Prop({ type: [MembreBureauSchema], default: [] })
     membresBureau?: MembreBureau[];
     @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' }] })
     reglement: Types.ObjectId[]
     @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' }] })
     guide: Types.ObjectId[]
     @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' }] })
     tutoriel: Types.ObjectId[]
     @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' }] })
     multimedia: Types.ObjectId[]
}
export const clubSchema = SchemaFactory.createForClass(Club)
