import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGuide } from './ineterface/interface.guide';
import mongoose from 'mongoose';
import { IClub } from 'src/club/interface/interface.club';

@Injectable()
export class GuideService {
   constructor(
      @InjectModel("ressource") private guideModel:Model<IGuide>,@InjectModel("club") private clubModel:Model<IClub>) {}
  
      //methode creat
       async ajouterguide(CreateguideDto:CreateGuideDto):Promise<IGuide> {
        const newguide =await new this.guideModel(CreateguideDto)
        const saveguide= await newguide.save() as IGuide
        const clubId= await this.clubModel.findById(CreateguideDto.club)
        if(clubId){ 
         clubId.guide.push(saveguide._id as mongoose.Types.ObjectId)
          const saveclub = await clubId.save()
          console.log(saveclub) 
        }
           return saveguide
          }
  
      //methode get
      async listeguide():Promise<IGuide[]>{
        const listeguide=await this.guideModel.find()
        return listeguide
      }
      //methode delete
    async supprimerguide(Guideid:string):Promise<IGuide>{
      const deleteData=await this.guideModel.findByIdAndDelete(Guideid)
      if(!deleteData){
        throw new NotFoundException(`guide avec l'id ${Guideid} est introuvable`)
      }
      const updateclub = await this.clubModel.findById(deleteData.club)
     if(updateclub){
       updateclub.guide =updateclub.guide.filter(chambId => chambId.toString()!== Guideid)
       await updateclub.save()
     }else{
     throw new NotFoundException(`evenement #${Guideid} est introuvable dans le club`)} 
      
        return deleteData
    }
  
    //methode update
    async modifierguide(id:string,UpdateguideDto:UpdateGuideDto):Promise<IGuide>{
      const updateData=await this.guideModel.findByIdAndUpdate (id,UpdateguideDto,{new:true})
      if(!updateData){
        throw new NotFoundException(`guide avec l'id ${id}, existe pas`);
      } 
      return updateData
      }
      //methode get by id
      async getbyid(id:string): Promise<IGuide>{
        const getguide=await this.guideModel.findById(id)
        if(!getguide){
          throw new NotFoundException(`guide avec l'id ${id}, existe pas `)
        }
        return getguide
    }
}
