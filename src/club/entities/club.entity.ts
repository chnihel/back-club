import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema()
export class Club {
     @Prop()
     nomClub:string
     @Prop()
     description:string
     @Prop()
     logo:string
     @Prop({type:mongoose.Schema.Types.ObjectId, ref:'user'})
     derigentClub: Types.ObjectId
     @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}]})
     membres: Types.ObjectId[]  
     @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'event'}]})
     evenement: Types.ObjectId[]  
     
     

}
export const clubSchema=SchemaFactory.createForClass(Club)
