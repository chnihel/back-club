import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMutimediaDto } from './dto/create-mutimedia.dto';
import { UpdateMutimediaDto } from './dto/update-mutimedia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IMultimedia } from './interface/interface.multimedia';
import mongoose, { Model } from 'mongoose';
import { IRessource } from 'src/ressources/interface/interface.ressource';
import { IClub } from 'src/club/interface/interface.club';
import { RessourcesService } from 'src/ressources/ressources.service';

@Injectable()
export class MutimediaService {
  constructor(
    @InjectModel("ressource") private multimediaModel:Model<IMultimedia>,@InjectModel("club") private clubModel:Model<IClub>,private ressouceService: RessourcesService) {}

    //methode creat
     async ajoutermultimedia(CreatemultimediaDto:CreateMutimediaDto):Promise<IMultimedia> {
      const newmultimedia =await new this.multimediaModel(CreatemultimediaDto)
      const savemultimedia= await newmultimedia.save() as IMultimedia
      const clubId= await this.clubModel.findById(CreatemultimediaDto.club)
      if(clubId){ 
       clubId.multimedia.push(savemultimedia._id as mongoose.Types.ObjectId)
        const saveClub = await clubId.save()
        console.log(saveClub) 
        await this.ressouceService.notifierNouveauContenu(
          clubId._id as mongoose.Types.ObjectId,
          'multimedia',
          'Nouveau multimedia ajouté !',
          `Le club ${clubId.nomClub} vient de publier un nouveau multimedia.`,
          'Nouveau multimedia ajouté !',
          `<h1>Le club ${clubId.nomClub} a ajouté un nouveau multimedia</h1>`
        );
      }
         return savemultimedia
        }

    //methode get
    async listemultimedia():Promise<IMultimedia[]>{
      const listemultimedia=await this.multimediaModel.find()
      return listemultimedia
    }
    //methode delete
  async supprimermultimedia(id:string):Promise<IMultimedia>{
    const deleteData=await this.multimediaModel.findByIdAndDelete(id)
    if(!deleteData){
      throw new NotFoundException(`multimedia avec l'id ${id} est introuvable`)
    }
    const updateClub = await this.clubModel.findById(deleteData.club)
         if(updateClub){
          updateClub.multimedia =updateClub.multimedia.filter(chambId => chambId.toString()!== id)
           await updateClub.save()
         }else{
         throw new NotFoundException(`evenement #${id} est introuvable dans le club`)} 

      return deleteData
  }

  //methode update
  async modifiermultimedia(id:string,UpdatemultimediaDto:UpdateMutimediaDto):Promise<IMultimedia>{
    const updateData=await this.multimediaModel.findOneAndUpdate ({_id:id,type:"multimedia"},UpdatemultimediaDto,{new:true})
    if(!updateData){
      throw new NotFoundException(`multimedia avec l'id ${id}, existe pas`);
    } 
    return updateData
    }
    //methode get by id
    async getbyid(id:string): Promise<IMultimedia>{
      const getmultimedia=await this.multimediaModel.findById(id).populate({
    path: 'commentaire',
    populate: {
      path: 'membre',
      select: 'nom prenom',
    },
  })
      if(!getmultimedia){
        throw new NotFoundException(`multimedia avec l'id ${id}, existe pas `)
      }
      return getmultimedia
  }
}
