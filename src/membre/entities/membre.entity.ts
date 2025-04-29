import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";
@Schema()
export class Membre extends User {
    role: string
 
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'club' }] })
    club: Types.ObjectId[]

}
export const membreSchema = SchemaFactory.createForClass(Membre)
