import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res, HttpCode, Req,Headers, Query } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { join } from 'path';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IMembre } from 'src/membre/interface/interface.membre';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { IClub } from 'src/club/interface/interface.club';
import { Ievenement } from 'src/evenement/interface/interface.event';


@Controller('paiement')
export class PaiementController {

  constructor(private readonly PaiementService:PaiementService,@InjectModel('user') private MembreModel: Model<IMembre>,@InjectModel('ticket') private ticketModel: Model<Ticket>,@InjectModel('club') private clubModel: Model<IClub>,@InjectModel('event') private eventModel: Model<Ievenement>) {}
    @Post('create-checkout-session/:clubId/:membreId')
  async createCheckoutSession(@Param('clubId') clubId:string,@Param('membreId') membreId:string) {
    try {
      const session = await this.PaiementService.createPayement(clubId,membreId);
      return { id: session.id };
    } catch (error) {
      console.error('Error in PaymentController:', error);
      throw new HttpException(
        'Failed to create payment session',
        error.status || 500,
      );
    }
  }

  @Post('create-checkout-session/event/:eventId/:membreId')
  async createCheckoutSessionEvent(@Param('eventId') eventId:string,@Param('membreId') membreId:string,) {
    try {
      const session = await this.PaiementService.createPayementEvent(eventId,membreId);
      return { id: session.id };
    } catch (error) {
      console.error('Error in PaymentController:', error);
      throw new HttpException(
        'Failed to create payment session',
        error.status || 500,
      );
    }
  }
  @Get('paiementSuccess')
async success(@Res() res: any, @Query('membreId') membreId: string, @Query('clubId') clubId: string) {
  const club = await this.clubModel.findById(clubId);
const membre = await this.MembreModel.findById(membreId);
let ticket
  if (membreId && clubId) {
    const updateResult = await this.MembreModel.updateOne(
      {
        _id: membreId,
        role: 'membre',
        'club.clubId': new Types.ObjectId(clubId)
      },
      {
        $set: {
          'club.$.isPaid': true,
          'club.$.datePaiement': new Date() 

        }
      }
    );
    console.log(updateResult); 
 if (updateResult.matchedCount === 0) {
      await this.MembreModel.updateOne(
        { _id: membreId, role: 'membre' },
        {
          $push: {
            club: {
              clubId: new Types.ObjectId(clubId),
              isPaid: true,
              datePaiement: new Date()
            }
          }
        }
      );
    }
  }
     if (club && membre) {
      ticket = await this.ticketModel.create({
        membreId,
        clubId,
        montant: club.cotisation,
        nomClub: club.nomClub,
        nomMembre: membre.nom, 
      })

  }
  

 if (ticket) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'paiementSuccess.html'), {
      headers: {
        'ticketId': ticket._id.toString()
      }
    });
  } else {
    return res.status(500).json({ message: 'Le ticket n\'a pas pu être créé' });
  }
}



   @Get('paiementEvent')
   async successEvent(
  @Res() res: any,
  @Query('membreId') membreId: string,
  @Query('eventId') eventId: string
) {
  const event = await this.eventModel.findById(eventId);
  const membre = await this.MembreModel.findById(membreId);
  let ticket;

  if (!event || !membre) {
    return res.status(404).json({ message: 'Membre ou événement introuvable' });
  }

  // 1. Tenter de mettre à jour l'event si déjà présent
  const updateResult = await this.MembreModel.updateOne(
    {
      _id: membreId,
      role: 'membre',
      'event.eventId': new Types.ObjectId(eventId)
    },
    {
      $set: {
        'event.$.isPaid': true,
      }
    }
  );

  // 2. Si l'événement n'existe pas, alors on le push
  if (updateResult.matchedCount === 0) {
    await this.MembreModel.updateOne(
      { _id: membreId, role: 'membre' },
      {
        $push: {
          event: {
            eventId: new Types.ObjectId(eventId),
            isPaid: true
          }
        }
      }
    );
  }

  // 3. Créer le ticket
  ticket = await this.ticketModel.create({
    membreId,
    eventId,
    montant: event.frais,
    nomEvent: event.nomEvent,
    nomMembre: membre.nom,
  });

  if (ticket) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'paiementEvent.html'), {
      headers: {
        'ticketId': ticket._id.toString()
      }
    });
  } else {
    return res.status(500).json({ message: 'Le ticket n\'a pas pu être créé' });
  }
}
 /*  async successEvent(@Res() res: any, @Query('membreId') membreId: string,@Query('eventId') eventId: string
) {
   const event = await this.eventModel.findById(eventId);
const membre = await this.MembreModel.findById(membreId);
let ticket;
  if (membreId && eventId) {
    await this.MembreModel.findOneAndUpdate({_id:membreId,role:"membre"}, {
      $push: {
        event: {
          eventId: new Types.ObjectId(eventId), 
          isPaid: true
        }
      }
    });
  }
  if (event && membre) {
      ticket = await this.ticketModel.create({
        membreId,
        eventId,
        montant: event.frais,
        nomClub: event.nomEvent,
        nomMembre: membre.nom, 
      })

  }
  if(ticket){
    return res.sendFile(join(__dirname, '..', '..', 'public', 'paiementEvent.html'),{
      headers: {
        'ticketId': ticket._id.toString()
      }
    });

  }
  else {
    return res.status(500).json({ message: 'Le ticket n\'a pas pu être créé' });
  }
  } */
 /*  @Get('paiementEvent')
  async successEvent(@Res() res: any, @Query('membreId') membreId: string,@Query('eventId') eventId: string
) {
  if (membreId && eventId) {
    await this.MembreModel.updateOne(
      { _id: membreId, 'event.eventId': eventId },
      {
        $set: {
          'event.$.isPaid': true,
          'event.$.datePaiement': new Date(),
        },
      }
    );
  }
    return res.sendFile(join(__dirname, '..', '..', 'public', 'paiementEvent.html'));
  } */
    @Get('paiementFailed')
    cancel(@Res() res: any) {
      return res.sendFile(join(__dirname,  '..', '..', 'public', 'paiementFailed.html'));
    }

@Get('testUpdatePaiement')
async testUpdatePaiement() {
  await this.PaiementService.updateExpiredPaiements();
  return { message: 'Mise à jour des paiements expirés effectuée.' };
}
}
