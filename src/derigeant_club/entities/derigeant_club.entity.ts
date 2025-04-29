import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema()
export class DerigeantClub extends User {
   role: string
   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'club' }],default: [] })
   club: Types.ObjectId[]
   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],default: [] })
   evenement: Types.ObjectId[]
   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ressource' }],default: [] })
   ressource: Types.ObjectId[]

}
export const derigeantSchema = SchemaFactory.createForClass(DerigeantClub)
