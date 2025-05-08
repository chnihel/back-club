import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    sender: Types.ObjectId[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
    recepient: Types.ObjectId[]
    @Prop()
    content: string
}
export const MessageSchema=SchemaFactory.createForClass(Message)
