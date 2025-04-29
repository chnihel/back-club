import { Document, Types } from "mongoose";

export interface IClub extends Document {
  readonly nomClub: string
  readonly description: string
  logo:string
  derigentClub: Types.ObjectId
  membres: Types.ObjectId[]
  evenement: Types.ObjectId[]  


}