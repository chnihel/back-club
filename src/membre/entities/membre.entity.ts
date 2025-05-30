import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema({ timestamps: true })
export class ClubPaiement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'club' })
  clubId: Types.ObjectId;

  @Prop({ default: false })
  isPaid: boolean;
   @Prop({ default: Date.now })
datePaiement: Date;
}
export const ClubPaiementSchema = SchemaFactory.createForClass(ClubPaiement);

@Schema({ timestamps: true })
export class EventPaiement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'event' })
  eventId: Types.ObjectId;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  datePaiement: Date;
}
export const EventPaiementSchema = SchemaFactory.createForClass(EventPaiement);
@Schema()
export class Membre extends User {
  role: string
  @Prop()
  roleInClub: string

  @Prop({ type: [ClubPaiementSchema], default: [] })
  club: ClubPaiement[];
  @Prop({ type: [EventPaiementSchema], default: [] })
  event: EventPaiement[];
  @Prop()
  fcmToken: string
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'commentaire' }], default: [] })
  commentaire: Types.ObjectId[]

}
export const membreSchema = SchemaFactory.createForClass(Membre)
