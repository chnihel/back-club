import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IRessource } from './interface/interface.ressource';
import { Iderigeant } from 'src/derigeant_club/interface/interface.derigeant';

@Injectable()
export class RessourcesService {
   constructor(
      @InjectModel("ressource") private ressourceModel:Model<IRessource>) {}
  
      //methode creat
      /*  async ajouterressource(CreateressourceDto:CreateRessourceDto):Promise<IRessource> {
        const newressource =await new this.ressourceModel(CreateressourceDto)
        const saveressource= await newressource.save() as IRessource
        const derigeantId= await this.derigeantModel.findById(CreateressourceDto.derigeantClub)
            if(derigeantId){
               
              derigeantId.ressource.push(saveressource._id as mongoose.Types.ObjectId)
              const savederigeant = await derigeantId.save()
              console.log(savederigeant) 
            } 
           return newressource
          } */
  
      //methode get
      async listeressource():Promise<IRessource[]>{
        const listeressource=await this.ressourceModel.find()
        return listeressource
      }
      //methode delete
   /*  async supprimerressource(chambid:string):Promise<IRessource>{
      const deleteData=await this.ressourceModel.findByIdAndDelete(chambid)
      if(!deleteData){
        throw new NotFoundException(`ressource avec l'id ${chambid} est introuvable`)
      }
      const updatederigeant = await this.derigeantModel.findById(deleteData.derigeantClub)
      if(updatederigeant){
        updatederigeant.ressource =updatederigeant.ressource.filter(chambId => chambId.toString()!== chambid)
        await updatederigeant.save()
      }else{
      throw new NotFoundException(`ressource #${chambid} est introuvable dans le derigeant`)}
        return deleteData
    } */
  
    //methode update
    async modifierressource(id:string,UpdateressourceDto:UpdateRessourceDto):Promise<IRessource>{
      const updateData=await this.ressourceModel.findByIdAndUpdate (id,UpdateressourceDto,{new:true})
      if(!updateData){
        throw new NotFoundException(`ressource avec l'id ${id}, existe pas`);
      } 
      return updateData
      }
      //methode get by id
      async getbyid(id:string): Promise<IRessource>{
        const getressource=await this.ressourceModel.findById(id)
        if(!getressource){
          throw new NotFoundException(`ressource avec l'id ${id}, existe pas `)
        }
        return getressource
    }
}
