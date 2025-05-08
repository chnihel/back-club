import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReglementDto } from './dto/create-reglement.dto';
import { UpdateReglementDto } from './dto/update-reglement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IReglement } from './interface/interface.reglement';
import mongoose, { Model } from 'mongoose';
import { IRessource } from 'src/ressources/interface/interface.ressource';
import { IClub } from 'src/club/interface/interface.club';
import { RessourcesService } from 'src/ressources/ressources.service';

@Injectable()
export class ReglementService {
  constructor(
    @InjectModel("ressource") private reglementModel:Model<IReglement>,@InjectModel("club") private clubModel:Model<IClub>,private ressouceService: RessourcesService) {}

    //methode creat
     async ajouterreglement(CreatereglementDto:CreateReglementDto):Promise<IReglement> {
      const newreglement =await new this.reglementModel(CreatereglementDto)
      const savereglement= await newreglement.save() as IReglement
      const clubId= await this.clubModel.findById(CreatereglementDto.club)
                 if(clubId){ 
                  clubId.reglement.push(savereglement._id as mongoose.Types.ObjectId)
                   const saveClub = await clubId.save()
                   console.log(saveClub) 
                   await this.ressouceService.notifierNouveauContenu(
                             clubId._id as mongoose.Types.ObjectId,
                             'tutoriel',
                             'Nouveau tutorieltutoriel ajouté !',
                             `Le club ${clubId.nomClub} vient de publier un nouveau tutoriel.`,
                             'Nouveau tutoriel ajouté !',
                             `<h1>Le club ${clubId.nomClub} a ajouté un nouveau tutoriel</h1>`
                           );
                 }
         return savereglement
        }

    //methode get
    async listereglement():Promise<IReglement[]>{
      const listereglement=await this.reglementModel.find()
      return listereglement
    }
    //methode delete
  async supprimerreglement(id:string):Promise<IReglement>{
    const deleteData=await this.reglementModel.findByIdAndDelete(id)
    if(!deleteData){
      throw new NotFoundException(`reglement avec l'id ${id} est introuvable`)
    }
     const updateClub = await this.clubModel.findById(deleteData.club)
         if(updateClub){
          updateClub.reglement =updateClub.reglement.filter(chambId => chambId.toString()!== id)
           await updateClub.save()
         }else{
         throw new NotFoundException(`evenement #${id} est introuvable dans le derigeant`)} 
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
