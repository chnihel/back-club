import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res, HttpCode, Req,Headers, Query } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { join } from 'path';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IMembre } from 'src/membre/interface/interface.membre';


@Controller('paiement')
export class PaiementController {

  constructor(private readonly PaiementService:PaiementService,@InjectModel('user') private MembreModel: Model<IMembre>) {}
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
  async createCheckoutSessionEvent(@Param('eventId') eventId:string,@Param('membreId') membreId:string) {
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
  if (membreId && clubId) {
    await this.MembreModel.updateOne(
      {
        _id: membreId,
        role: "membre",
        "club.clubId": clubId
      },
      {
        $set: {
          "club.$.isPaid": true
        }
      }
    );
  }

  return res.sendFile(join(__dirname, '..', '..', 'public', 'paiementSuccess.html'));
}


   @Get('paiementEvent')
  async successEvent(@Res() res: any, @Query('membreId') membreId: string,@Query('eventId') eventId: string
) {
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
    return res.sendFile(join(__dirname, '..', '..', 'public', 'paiementEvent.html'));
  }
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
