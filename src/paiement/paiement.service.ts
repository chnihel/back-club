import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import Stripe from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ipaiement } from './interface/interface.paiement';
import { IClub } from 'src/club/interface/interface.club';
import { IMembre } from 'src/membre/interface/interface.membre';
import { Ievenement } from 'src/evenement/interface/interface.event';

@Injectable()
export class PaiementService {
  private stripe: Stripe
  constructor(@InjectModel("paiement") private paiementModel: Model<Ipaiement>, @InjectModel('club') private clubModel: Model<IClub>, @InjectModel('user') private MembreModel: Model<IMembre>, @InjectModel('event') private EventModel: Model<Ievenement>) {
    this.stripe = new Stripe("sk_test_51RKGgQCxKCZF6yvyYP5QJ2MoNYwcZMUNfORufh9vFnDWjFC7hP4FH3fWNPjd0qsDFxQ14ciazTipMFMUyfgt3GHR00mYgI9ATx", {
      apiVersion: "2020-08-27" as any,
    })
  }

  async createPayement(clubId: string, membreId: string): Promise<any> {
    try {
      const Club = await this.clubModel.findById(clubId)
      const Membre = await this.MembreModel.findById(membreId)

      if (!Club || !Membre) {
        throw new NotFoundException('club not found or membre not found')
      }
      if (typeof Club.cotisation !== 'number' || isNaN(Club.cotisation)) {
        throw new BadRequestException('La cotisation du club est invalide.');
      }
      const montantTotal = Club.cotisation
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Cotisation - ${Club.nomClub}`
              },
              unit_amount: montantTotal * 100,
            },
            //par defaut paiemment effecter une seul fois
            quantity: 1
          }
        ],
        mode: 'payment',
        metadata: {
          club: clubId,
          membre: membreId,
          montant: montantTotal,
        },
        success_url: `http://localhost:5000/paiement/paiementSuccess?membreId=${membreId}&clubId=${clubId}`,
        cancel_url: 'http://localhost:5000/payement/paiementFailed',
      })
      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new HttpException(
        'Unable to create checkout session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  async createPayementEvent(eventId: string, membreId: string): Promise<any> {
    try {
      const event = await this.EventModel.findById(eventId)
      const Membre = await this.MembreModel.findById(membreId)

      if (!event || !Membre) {
        throw new NotFoundException('club not found or membre not found')
      }
      const montantTotal = event.frais
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Cotisation - ${event.nomEvent}`
              },
              unit_amount: montantTotal * 100,
            },
            //par defaut paiemment effecter une seul fois
            quantity: 1
          }
        ],
        mode: 'payment',
        metadata: {
          event: eventId,
          membre: membreId,
          montant: montantTotal,
        },
        success_url: `http://localhost:5000/paiement/paiementEvent?membreId=${membreId}&eventId=${eventId}`,
        cancel_url: 'http://localhost:5000/payement/paiementFailed',
      })
      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new HttpException(
        'Unable to create checkout session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

/*   async handleStripeWebhook(payload: Buffer, sig: string): Promise<boolean> {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        sig,
        'whsec_tonSecretWebhook' // remplace avec ton vrai secret de webhook
      );
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed.', err.message);
      return false;
    }

    // Gérer le type d’événement
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const clubId = session.metadata!.club;
      const membreId = session.metadata!.membre;
      const montant = Number(session.metadata!.montant);

      await this.paiementModel.create({
        club: clubId,
        membre: membreId,
        montant: montant,
      });

      console.log('✅ Paiement enregistré dans la base de données');
    }

    return true;
  } */

}
