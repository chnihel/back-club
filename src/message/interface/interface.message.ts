import { Document, Types } from "mongoose";

export interface IMessage extends Document{
    sender: Types.ObjectId
    recepient: Types.ObjectId[]
    clubId: Types.ObjectId

    content: string
}