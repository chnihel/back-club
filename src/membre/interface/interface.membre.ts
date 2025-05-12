import { Document, Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";

export interface IpaiementClub extends Document{
clubId: Types.ObjectId;

  isPaid: boolean;

  datePaiement: Date;
}
export interface IMembre extends IUser {
    role: string
    roleInClub?: string
    isPaid: boolean;
    isPaidEvent: boolean;

    club: Types.ObjectId[]
    event: Types.ObjectId[]
    fcmToken?: string;
    commentaire: Types.ObjectId[]

}