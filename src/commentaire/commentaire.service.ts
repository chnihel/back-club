import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Icommentaire } from './interface/interface.commentaire';
import { IMultimedia } from 'src/mutimedia/interface/interface.multimedia';
import { ITutoriel } from 'src/tutoriel/interface/interface.tutoriel';
import { IMembre } from 'src/membre/interface/interface.membre';

@Injectable()
export class CommentaireService {
   constructor(
      @InjectModel("commentaire") private commentaireModel:Model<Icommentaire>,@InjectModel("ressource") private MultimediaModel:Model<IMultimedia>,@InjectModel("ressource") private TutorielModel:Model<ITutoriel>,@InjectModel("user") private MembreModel:Model<IMembre>) {}
  
      //methode creat
       async ajoutercommentaire(CreatecommentaireDto:CreateCommentaireDto):Promise<Icommentaire> {
        const newcommentaire =await new this.commentaireModel(CreatecommentaireDto)
        const savecommentaire= await newcommentaire.save() as Icommentaire
        const multimediaId= await this.MultimediaModel.findById(CreatecommentaireDto.multimedia)
            if(multimediaId){
               
              multimediaId.commentaire.push(savecommentaire._id as mongoose.Types.ObjectId)
              const savemultimedia = await multimediaId.save()
              console.log(savemultimedia) 
            }
            //ajouter memebre qui ajoute le commentaire
        /*     const membreId= await this.MembreModel.findById(CreatecommentaireDto.membre)
            if(membreId){
               
              membreId.commentaire.push(savecommentaire._id as mongoose.Types.ObjectId)
              const savemembre = await membreId.save()
              console.log(savemembre) 
            } */
            const tutuorielId= await this.TutorielModel.findById(CreatecommentaireDto.tutoriel)
            if(tutuorielId){
               
              tutuorielId.commentaire.push(savecommentaire._id as mongoose.Types.ObjectId)
              const savetutoriel = await tutuorielId.save()
              console.log(savetutoriel) 
            }
           return newcommentaire
          }
  
      //methode get
      async listecommentaire():Promise<Icommentaire[]>{
        const listecommentaire=await this.commentaireModel.find()
        return listecommentaire
      }
      //methode delete
    async supprimercommentaire(commentId:string):Promise<Icommentaire>{
      const deleteData=await this.commentaireModel.findByIdAndDelete(commentId)
      if(!deleteData){
        throw new NotFoundException(`commentaire avec l'id ${commentId} est introuvable`)
      }
      const updateMultimedia = await this.MultimediaModel.findById(deleteData.multimedia)
      const updateTuotoriel = await this.TutorielModel.findById(deleteData.tutoriel)
      const updateMembre = await this.MembreModel.findById(deleteData.membre)
      if(updateMultimedia){
        updateMultimedia.commentaire =updateMultimedia.commentaire.filter(IdComment => IdComment.toString()!== commentId)
        await updateMultimedia.save()
      }
      if(updateTuotoriel){
        updateTuotoriel.commentaire =updateTuotoriel.commentaire.filter(IdComment => IdComment.toString()!== commentId)
        await updateTuotoriel.save()
      }
      if(updateMembre){
        updateMembre.commentaire =updateMembre.commentaire.filter(IdComment => IdComment.toString()!== commentId)
        await updateMembre.save()
      }
      else{
      throw new NotFoundException(`commentaire #${commentId} est introuvable dans le hotel`)} 
        return deleteData
    }
  
    //methode update
    async modifiercommentaire(id:string,UpdatecommentaireDto:UpdateCommentaireDto):Promise<Icommentaire>{
      const updateData=await this.commentaireModel.findByIdAndUpdate (id,UpdatecommentaireDto,{new:true})
      if(!updateData){
        throw new NotFoundException(`commentaire avec l'id ${id}, existe pas`);
      } 
      return updateData
      }
      //methode get by id
      async getbyid(id:string): Promise<Icommentaire>{
        const getcommentaire=await this.commentaireModel.findById(id).populate('commentaire')
        if(!getcommentaire){
          throw new NotFoundException(`commentaire avec l'id ${id}, existe pas `)
        }
        return getcommentaire
    }
}
