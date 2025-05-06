import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ievenement } from './interface/interface.event';
import { Iderigeant } from 'src/derigeant_club/interface/interface.derigeant';
import { IClub } from 'src/club/interface/interface.club';

@Injectable()
export class EvenementService {
  constructor(
     @InjectModel("event") private evenementModel:Model<Ievenement>,@InjectModel("user") private derigeantModel:Model<Iderigeant>,@InjectModel("club") private clubModel:Model<IClub>) {}
 
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
   async supprimerevenement(chambid:string):Promise<Ievenement>{
     const deleteData=await this.evenementModel.findByIdAndDelete(chambid)
     if(!deleteData){
       throw new NotFoundException(`evenement avec l'id ${chambid} est introuvable`)
     }
      const updatederigeant = await this.derigeantModel.findById(deleteData.derigeantClub)
     if(updatederigeant){
       updatederigeant.evenement =updatederigeant.evenement.filter(chambId => chambId.toString()!== chambid)
       await updatederigeant.save()
     }else{
     throw new NotFoundException(`evenement #${chambid} est introuvable dans le derigeant`)} 
     const updateClub = await this.clubModel.findById(deleteData.derigeantClub)
     if(updateClub){
      updateClub.evenement =updateClub.evenement.filter(chambId => chambId.toString()!== chambid)
       await updateClub.save()
     }else{
     throw new NotFoundException(`evenement #${chambid} est introuvable dans le derigeant`)} 
       return deleteData
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


   
}
