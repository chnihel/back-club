import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGuide } from './ineterface/interface.guide';
import mongoose from 'mongoose';
import { IRessource } from 'src/ressources/interface/interface.ressource';

@Injectable()
export class GuideService {
   constructor(
      @InjectModel("guide") private guideModel:Model<IGuide>,@InjectModel("ressource") private ressourceModel:Model<IRessource>) {}
  
      //methode creat
       async ajouterguide(CreateguideDto:CreateGuideDto):Promise<IGuide> {
        const newguide =await new this.guideModel(CreateguideDto)
        const saveguide= await newguide.save() as IGuide
        const ressoirceId= await this.ressourceModel.findById(CreateguideDto.ressource) as IRessource
            if(ressoirceId){
               
              ressoirceId.guide.push(saveguide._id as mongoose.Types.ObjectId)
              const saveRessource = await ressoirceId.save()
              console.log(saveRessource) 
            }
           return newguide
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
       const updateressource = await this.ressourceModel.findById(deleteData.ressource) as IRessource
      if(updateressource){
        updateressource.guide =updateressource.guide.filter(chambId => chambId.toString()!== Guideid)
        await updateressource.save()
      }else{
      throw new NotFoundException(`guide #${Guideid} est introuvable dans le ressource`)}  
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
