import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorielDto } from './dto/create-tutoriel.dto';
import { UpdateTutorielDto } from './dto/update-tutoriel.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ITutoriel } from './interface/interface.tutoriel';
import { IRessource } from 'src/ressources/interface/interface.ressource';

@Injectable()
export class TutorielService {
  constructor(
    @InjectModel("tutoriel") private tutorielModel:Model<ITutoriel>,@InjectModel("ressource") private ressourceModel:Model<IRessource>) {}

    //methode creat
     async ajoutertutoriel(CreatetutorielDto:CreateTutorielDto):Promise<ITutoriel> {
      const newtutoriel =await new this.tutorielModel(CreatetutorielDto)
      const savetutoriel= await newtutoriel.save() as ITutoriel
      const ressourceId= await this.ressourceModel.findById(CreatetutorielDto.ressource)
          if(ressourceId){
             
            ressourceId.tutoriel.push(savetutoriel._id as mongoose.Types.ObjectId) 
            const saveressource = await ressourceId.save()
            console.log(saveressource) 
          }
         return newtutoriel
        }

    //methode get
    async listetutoriel():Promise<ITutoriel[]>{
      const listetutoriel=await this.tutorielModel.find()
      return listetutoriel
    }
    //methode delete
  async supprimertutoriel(chambid:string):Promise<ITutoriel>{
    const deleteData=await this.tutorielModel.findByIdAndDelete(chambid)
    if(!deleteData){
      throw new NotFoundException(`tutoriel avec l'id ${chambid} est introuvable`)
    }
    const updateressource = await this.ressourceModel.findById(deleteData.ressource)
    if(updateressource){
      updateressource.tutoriel =updateressource.tutoriel.filter(chambId => chambId.toString()!== chambid)
      await updateressource.save()
    }else{
    throw new NotFoundException(`tutoriel #${chambid} est introuvable dans le ressource`)} 
      return deleteData
  }

  //methode update
  async modifiertutoriel(id:string,UpdatetutorielDto:UpdateTutorielDto):Promise<ITutoriel>{
    const updateData=await this.tutorielModel.findByIdAndUpdate (id,UpdatetutorielDto,{new:true})
    if(!updateData){
      throw new NotFoundException(`tutoriel avec l'id ${id}, existe pas`);
    } 
    return updateData
    }
    //methode get by id
    async getbyid(id:string): Promise<ITutoriel>{
      const gettutoriel=await this.tutorielModel.findById(id)
      if(!gettutoriel){
        throw new NotFoundException(`tutoriel avec l'id ${id}, existe pas `)
      }
      return gettutoriel
  }
}
