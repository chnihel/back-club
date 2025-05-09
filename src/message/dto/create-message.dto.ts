import { Types } from "mongoose"

export class CreateMessageDto {
    sender: Types.ObjectId
    recepient: Types.ObjectId[]
        clubId?: Types.ObjectId
     recepientId?: Types.ObjectId
    content: string
    type:string
}
