import { Document, Types } from "mongoose";
export interface IMembreBureau {
  nom: string;
  role: string;
  image: string;
  _id?: Types.ObjectId | string; // <- ajouter ceci

}
export interface IClub extends Document {
  readonly nomClub: string
  readonly description: string
  logo:string
  cotisation:number
  mission:string
  vision:string
  objectifs:string
  status: boolean
  activitePrincipale:string
  derigentClub: Types.ObjectId
  membres: Types.ObjectId[]
  evenement: Types.ObjectId[]  
  membresBureau:IMembreBureau[]
    multimedia: Types.ObjectId[]
    tutoriel: Types.ObjectId[]
    guide: Types.ObjectId[]
    reglement: Types.ObjectId[]
         rapport: Types.ObjectId[]
    
}