import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ievenement } from './interface/interface.event';
import { Iderigeant } from 'src/derigeant_club/interface/interface.derigeant';
import { IClub } from 'src/club/interface/interface.club';
import { IMembre } from 'src/membre/interface/interface.membre';
import { Types } from 'mongoose';

@Injectable()
export class EvenementService {
  constructor(
     @InjectModel("event") private evenementModel:Model<Ievenement>,@InjectModel("user") private derigeantModel:Model<Iderigeant>,@InjectModel("club") private clubModel:Model<IClub>,@InjectModel("user") private membreModel:Model<IMembre>) {}
 
     //methode creat
      async ajouterevenement(CreateevenementDto:CreateEvenementDto):Promise<Ievenement> {
       const newevenement =await new this.evenementModel(CreateevenementDto)
       const saveevenement= await newevenement.save() as Ievenement
       const derigeantId= await this.derigeantModel.findById(CreateevenementDto.derigeantClub)
           if(derigeantId){ 
             derigeantId.evenement.push(saveevenement._id as mongoose.Types.ObjectId)
             const savederigeant = await derigeantId.save()
             console.log(savederigeant) 
           }

           const clubId= await this.clubModel.findById(CreateevenementDto.club)
           if(clubId){ 
            clubId.evenement.push(saveevenement._id as mongoose.Types.ObjectId)
             const savederigeant = await clubId.save()
             console.log(savederigeant) 
           }
          return newevenement
         }
 
     //methode get
     async listeevenement():Promise<Ievenement[]>{
       const listeevenement=await this.evenementModel.find().populate('club').populate('derigeantClub')
       return listeevenement
     }
     //methode delete
     async supprimerevenement(chambid: string): Promise<any> {
      const evenement = await this.evenementModel.findById(chambid);
      if (!evenement) {
        throw new NotFoundException(`evenement avec l'id ${chambid} est introuvable`);
      }
    
      const updatederigeant = await this.derigeantModel.findById(evenement.derigeantClub);
      if (updatederigeant) {
        updatederigeant.evenement = updatederigeant.evenement.filter(
          chambId => chambId.toString() !== chambid
        );
        await updatederigeant.save();
      } else {
        console.warn(`Derigeant non trouvé pour evenement #${chambid}`);
      }
    
      const updateClub = await this.clubModel.findById(evenement.club);
      if (updateClub) {
        updateClub.evenement = updateClub.evenement.filter(
          chambId => chambId.toString() !== chambid
        );
        await updateClub.save();
      } else {
        console.warn(`Club non trouvé pour evenement #${chambid}`);
      }
    
      const deleteData = await this.evenementModel.findByIdAndDelete(chambid);
      return deleteData;
    }
    
 
   //methode update
   async modifierevenement(id:string,UpdateevenementDto:UpdateEvenementDto):Promise<Ievenement>{
     const updateData=await this.evenementModel.findByIdAndUpdate (id,UpdateevenementDto,{new:true})
     if(!updateData){
       throw new NotFoundException(`evenement avec l'id ${id}, existe pas`);
     } 
     return updateData
     }
     //methode get by id
     async getbyid(id:string): Promise<Ievenement>{
       const getevenement=await this.evenementModel.findById(id).populate('membres')
       if(!getevenement){
         throw new NotFoundException(`evenement avec l'id ${id}, existe pas `)
       }
       return getevenement
   }

    //count membre qui suit un event specifique
async countNbreMembreSuiviParMois(eventId: string) {
  try {
    const objectId = new Types.ObjectId(eventId);
    console.log("Début agrégation pour l'eventId:", objectId);

    const debugMatch = await this.membreModel.find({
      role: 'membre',
      event: {
        $elemMatch: {
          eventId: objectId,
          isPaid: true
        }
      }
    });
    console.log("Membres trouvés avant unwind:", debugMatch.length);
    debugMatch.forEach((m, i) => {
      console.log(`[${i}] - ${m.nom} | Events:`, m.event);
    });

    const stats = await this.membreModel.aggregate([
      {
        $match: {
          role: 'membre',
          event: {
            $elemMatch: {
              eventId: objectId,
              isPaid: true
            }
          }
        }
      },
      { $unwind: '$event' },
      {
        $match: {
          'event.eventId': objectId,
          'event.isPaid': true
        }
      },
      {
        $project: {
          createdAt: {
            $toDate: '$event.createdAt'
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      }
    ]);

    const event = await this.evenementModel.findById(objectId).select("nomEvent");
    console.log("Nom event:", event?.nomEvent);

    return {
      nomEvent: event?.nomEvent || "Nom inconnu",
      data: stats.map(item => ({
        month: `${item._id.month}/${item._id.year}`,
        count: item.count
      }))
    };
  } catch (error) {
    console.error("Erreur agrégation:", error);
    throw new Error('Erreur lors de la récupération des membres par mois');
  }
}







     

   
}
