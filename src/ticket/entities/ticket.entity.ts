import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop()
  membreId: string;

  @Prop()
  clubId?: string;

  @Prop()
  eventId?: string;

  @Prop()
  nomMembre: string;

  @Prop()
  nomClub?: string;

  @Prop()
  nomEvent?: string;

  @Prop()
  montant: number;

  @Prop({ default: new Date() })
  datePaiement: Date;

  @Prop({ default: 'payé' })
  statut: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
