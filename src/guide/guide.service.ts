import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGuide } from './ineterface/interface.guide';
import mongoose from 'mongoose';
import { IClub } from 'src/club/interface/interface.club';
import { IMembre } from 'src/membre/interface/interface.membre';
import { NotificationService } from 'src/notification/notification.service';
import { MailerService } from '@nestjs-modules/mailer';
import { RessourcesService } from 'src/ressources/ressources.service';

@Injectable()
export class GuideService {
  constructor(
    @InjectModel("ressource") private guideModel: Model<IGuide>, @InjectModel("club") private clubModel: Model<IClub>,
   private ressouceService: RessourcesService) { }

  //methode creat
  async ajouterguide(CreateguideDto: CreateGuideDto): Promise<IGuide> {
    const newguide = await new this.guideModel(CreateguideDto)
    const saveguide = await newguide.save() as IGuide
    const clubId = await this.clubModel.findById(CreateguideDto.club)
    if (clubId) {
      clubId.guide.push(saveguide._id as mongoose.Types.ObjectId)
      const saveclub = await clubId.save()
      console.log(saveclub)
     /*  const membres = await this.MembreModel.find({
        club: {
          $elemMatch: {
            clubId: clubId._id,
            isPaid: true
          }
        }
      })
      console.log("membres qui la notifiaction a envoyer",membres)
      const tokens: string[] = membres
        .map(m => m.fcmToken)
        .filter((token): token is string => Boolean(token));
        console.log('tokens membres',tokens)
      if (tokens.length > 0) {
        await this.notificationService.sendNotifToMultiple({
          title: 'Nouveau guide ajouté !',
          body: `Le club ${clubId.nomClub} vient de publier un nouveau guide.`,
          deviceIds: tokens,
        });
      }

      //send Email
      for (const membre of membres) {
        if (membre.email) {
          const option = {
            to: membre.email,
            subject: 'Nouveau guide ajouté !',
            html: `<h1>Le club ${clubId.nomClub} a ajouté un nouveau guide</h1>`,
          };
      
          await this.mailerService.sendMail(option);
        }
      } */
        await this.ressouceService.notifierNouveauContenu(
          clubId._id as mongoose.Types.ObjectId,
          'guide',
          'Nouveau guide ajouté !',
          `Le club ${clubId.nomClub} vient de publier un nouveau guide.`,
          'Nouveau guide ajouté !',
          `<h1>Le club ${clubId.nomClub} a ajouté un nouveau guide</h1>`
        );
    }
    return saveguide
  }


  //methode get
  async listeguide(): Promise<IGuide[]> {
    const listeguide = await this.guideModel.find()
    return listeguide
  }
  //methode delete
  async supprimerguide(Guideid: string): Promise<IGuide> {
    const deleteData = await this.guideModel.findByIdAndDelete(Guideid)
    if (!deleteData) {
      throw new NotFoundException(`guide avec l'id ${Guideid} est introuvable`)
    }
    const updateclub = await this.clubModel.findById(deleteData.club)
    if (updateclub) {
      updateclub.guide = updateclub.guide.filter(chambId => chambId.toString() !== Guideid)
      await updateclub.save()
    } else {
      throw new NotFoundException(`evenement #${Guideid} est introuvable dans le club`)
    }

    return deleteData
  }

  //methode update
  async modifierguide(id: string, UpdateguideDto: UpdateGuideDto): Promise<IGuide> {
    const updateData = await this.guideModel.findByIdAndUpdate(id, UpdateguideDto, { new: true })
    if (!updateData) {
      throw new NotFoundException(`guide avec l'id ${id}, existe pas`);
    }
    return updateData
  }
  //methode get by id
  async getbyid(id: string): Promise<IGuide> {
    const getguide = await this.guideModel.findById(id)
    if (!getguide) {
      throw new NotFoundException(`guide avec l'id ${id}, existe pas `)
    }
    return getguide
  }
}
