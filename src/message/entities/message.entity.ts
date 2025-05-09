import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    sender: Types.ObjectId
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'club' })
    clubId?: Types.ObjectId
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
    recepient: Types.ObjectId[]
     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    recepientId?: Types.ObjectId
    @Prop()
    content: string
    @Prop({ default: 'club', enum: ['club', 'private'] })
    type: string;
}
export const MessageSchema=SchemaFactory.createForClass(Message)
