import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Icommentaire } from './interface/interface.commentaire';

@Injectable()
export class CommentaireService {
   constructor(
      @InjectModel("commentaire") private commentaireModel:Model<Icommentaire>) {}
  
      //methode creat
       async ajoutercommentaire(CreatecommentaireDto:CreateCommentaireDto):Promise<Icommentaire> {
        const newcommentaire =await new this.commentaireModel(CreatecommentaireDto)
        /* const savecommentaire= await newcommentaire.save() as Icommentaire
        const hotelId= await this.hotelModel.findById(CreatecommentaireDto.hotel)
            if(hotelId){
               
              hotelId.commentaire.push(savecommentaire._id as mongoose.Types.ObjectId)
              const savehotel = await hotelId.save()
              console.log(savehotel) 
            } */
           return newcommentaire
          }
  
      //methode get
      async listecommentaire():Promise<Icommentaire[]>{
        const listecommentaire=await this.commentaireModel.find()
        return listecommentaire
      }
      //methode delete
    async supprimercommentaire(chambid:string):Promise<Icommentaire>{
      const deleteData=await this.commentaireModel.findByIdAndDelete(chambid)
      if(!deleteData){
        throw new NotFoundException(`commentaire avec l'id ${chambid} est introuvable`)
      }
      /* const updatehotel = await this.hotelModel.findById(deleteData.hotel)
      if(updatehotel){
        updatehotel.commentaire =updatehotel.commentaire.filter(chambId => chambId.toString()!== chambid)
        await updatehotel.save()
      }else{
      throw new NotFoundException(`commentaire #${chambid} est introuvable dans le hotel`)}  */
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
        const getcommentaire=await this.commentaireModel.findById(id)
        if(!getcommentaire){
          throw new NotFoundException(`commentaire avec l'id ${id}, existe pas `)
        }
        return getcommentaire
    }
}
