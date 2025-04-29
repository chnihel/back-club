import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReglementDto } from './dto/create-reglement.dto';
import { UpdateReglementDto } from './dto/update-reglement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IReglement } from './interface/interface.reglement';
import mongoose, { Model } from 'mongoose';
import { IRessource } from 'src/ressources/interface/interface.ressource';

@Injectable()
export class ReglementService {
  constructor(
    @InjectModel("reglement") private reglementModel:Model<IReglement>,@InjectModel("ressource") private ressourceModel:Model<IRessource>) {}

    //methode creat
     async ajouterreglement(CreatereglementDto:CreateReglementDto):Promise<IReglement> {
      const newreglement =await new this.reglementModel(CreatereglementDto)
      const savereglement= await newreglement.save() as IReglement
      const ressourceId= await this.ressourceModel.findById(CreatereglementDto.ressource)
          if(ressourceId){
             
            ressourceId.reglement.push(savereglement._id as mongoose.Types.ObjectId)
            const saveressource = await ressourceId.save()
            console.log(saveressource) 
          } 
         return newreglement
        }

    //methode get
    async listereglement():Promise<IReglement[]>{
      const listereglement=await this.reglementModel.find()
      return listereglement
    }
    //methode delete
  async supprimerreglement(chambid:string):Promise<IReglement>{
    const deleteData=await this.reglementModel.findByIdAndDelete(chambid)
    if(!deleteData){
      throw new NotFoundException(`reglement avec l'id ${chambid} est introuvable`)
    }
   const updateressource = await this.ressourceModel.findById(deleteData.ressource)
    if(updateressource){
      updateressource.reglement =updateressource.reglement.filter(chambId => chambId.toString()!== chambid)
      await updateressource.save()
    }else{
    throw new NotFoundException(`reglement #${chambid} est introuvable dans le ressource`)} 
      return deleteData
  }

  //methode update
  async modifierreglement(id:string,UpdatereglementDto:UpdateReglementDto):Promise<IReglement>{
    const updateData=await this.reglementModel.findByIdAndUpdate (id,UpdatereglementDto,{new:true})
    if(!updateData){
      throw new NotFoundException(`reglement avec l'id ${id}, existe pas`);
    } 
    return updateData
    }
    //methode get by id
    async getbyid(id:string): Promise<IReglement>{
      const getreglement=await this.reglementModel.findById(id)
      if(!getreglement){
        throw new NotFoundException(`reglement avec l'id ${id}, existe pas `)
      }
      return getreglement
  }
}
