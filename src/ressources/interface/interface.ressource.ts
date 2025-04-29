import { Document, Types } from "mongoose";

export interface IRessource extends Document{
      readonly titre:string
      readonly type:string
      readonly contenu:string
      derigeantClub: Types.ObjectId;
      guide: Types.ObjectId[]
      reglement: Types.ObjectId[]
      tutoriel: Types.ObjectId[]
      multimedia: Types.ObjectId[]


}