import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorielDto } from './dto/create-tutoriel.dto';
import { UpdateTutorielDto } from './dto/update-tutoriel.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ITutoriel } from './interface/interface.tutoriel';
import { IRessource } from 'src/ressources/interface/interface.ressource';
import { IClub } from 'src/club/interface/interface.club';
import { RessourcesService } from 'src/ressources/ressources.service';

@Injectable()
export class TutorielService {
  constructor(@InjectModel("ressource") private tutorielModel:Model<ITutoriel>,@InjectModel("club") private clubModel:Model<IClub>,private ressouceService: RessourcesService) {}

    //methode creat
     async ajoutertutoriel(CreatetutorielDto:CreateTutorielDto):Promise<ITutoriel> {
      const newtutoriel =await new this.tutorielModel(CreatetutorielDto)
      const savetutoriel= await newtutoriel.save() as ITutoriel
      const clubId= await this.clubModel.findById(CreatetutorielDto.club)
      if(clubId){ 
       clubId.tutoriel.push(savetutoriel._id as mongoose.Types.ObjectId)
        const saveClub = await clubId.save()
        console.log(saveClub) 
        await this.ressouceService.notifierNouveauContenu(
          clubId._id as mongoose.Types.ObjectId,
          'reglement',
          'Nouveau reglement ajouté !',
          `Le club ${clubId.nomClub} vient de publier un nouveau reglement.`,
          'Nouveau reglement ajouté !',
          `<h1>Le club ${clubId.nomClub} a ajouté un nouveau reglement</h1>`
        );
      }
         return savetutoriel
        }

    //methode get
    async listetutoriel():Promise<ITutoriel[]>{
      const listetutoriel=await this.tutorielModel.find()
      return listetutoriel
    }
    //methode delete
  async supprimertutoriel(id:string):Promise<ITutoriel>{
    const deleteData=await this.tutorielModel.findByIdAndDelete(id)
    if(!deleteData){
      throw new NotFoundException(`tutoriel avec l'id ${id} est introuvable`)
    }

    const updateClub = await this.clubModel.findById(deleteData.club)
         if(updateClub){
          updateClub.tutoriel =updateClub.tutoriel.filter(chambId => chambId.toString()!== id)
           await updateClub.save()
         }else{
         throw new NotFoundException(`evenement #${id} est introuvable dans le derigeant`)} 
      return deleteData
  }

  //methode update
  async modifiertutoriel(id:string,UpdatetutorielDto:UpdateTutorielDto):Promise<ITutoriel>{
    const updateData=await this.tutorielModel.findOneAndUpdate ({_id:id,type:"tutoriel"},UpdatetutorielDto,{new:true})
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
