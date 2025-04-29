import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMutimediaDto } from './dto/create-mutimedia.dto';
import { UpdateMutimediaDto } from './dto/update-mutimedia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IMultimedia } from './interface/interface.multimedia';
import mongoose, { Model } from 'mongoose';
import { IRessource } from 'src/ressources/interface/interface.ressource';

@Injectable()
export class MutimediaService {
  constructor(
    @InjectModel("multimedia") private multimediaModel:Model<IMultimedia>,@InjectModel("ressource") private ressourceModel:Model<IRessource>) {}

    //methode creat
     async ajoutermultimedia(CreatemultimediaDto:CreateMutimediaDto):Promise<IMultimedia> {
      const newmultimedia =await new this.multimediaModel(CreatemultimediaDto)
      const savemultimedia= await newmultimedia.save() as IMultimedia
      const ressourceId= await this.ressourceModel.findById(CreatemultimediaDto.ressource)
          if(ressourceId){
             
            ressourceId.multimedia.push(savemultimedia._id as mongoose.Types.ObjectId)
            const saveressource = await ressourceId.save()
            console.log(saveressource) 
          }
         return newmultimedia
        }

    //methode get
    async listemultimedia():Promise<IMultimedia[]>{
      const listemultimedia=await this.multimediaModel.find()
      return listemultimedia
    }
    //methode delete
  async supprimermultimedia(chambid:string):Promise<IMultimedia>{
    const deleteData=await this.multimediaModel.findByIdAndDelete(chambid)
    if(!deleteData){
      throw new NotFoundException(`multimedia avec l'id ${chambid} est introuvable`)
    }
    const updateressource = await this.ressourceModel.findById(deleteData.ressource)
    if(updateressource){
      updateressource.multimedia =updateressource.multimedia.filter(chambId => chambId.toString()!== chambid)
      await updateressource.save()
    }else{
    throw new NotFoundException(`multimedia #${chambid} est introuvable dans le ressource`)} 
      return deleteData
  }

  //methode update
  async modifiermultimedia(id:string,UpdatemultimediaDto:UpdateMutimediaDto):Promise<IMultimedia>{
    const updateData=await this.multimediaModel.findByIdAndUpdate (id,UpdatemultimediaDto,{new:true})
    if(!updateData){
      throw new NotFoundException(`multimedia avec l'id ${id}, existe pas`);
    } 
    return updateData
    }
    //methode get by id
    async getbyid(id:string): Promise<IMultimedia>{
      const getmultimedia=await this.multimediaModel.findById(id)
      if(!getmultimedia){
        throw new NotFoundException(`multimedia avec l'id ${id}, existe pas `)
      }
      return getmultimedia
  }
}
