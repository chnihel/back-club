import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IClub } from './interface/interface.club';
import { Iderigeant } from 'src/derigeant_club/interface/interface.derigeant';

@Injectable()
export class ClubService {
 
  constructor(
    @InjectModel("club") private clubModel:Model<IClub>,@InjectModel("user") private derigeantModel:Model<Iderigeant>) {}

    //methode creat
     async ajouterclub(CreateclubDto:CreateClubDto):Promise<IClub> {
      const newclub =await new this.clubModel(CreateclubDto)
      const saveclub= await newclub.save() as IClub
      const derigeantId= await this.derigeantModel.findById(CreateclubDto.derigentClub)
      console.log("derigeantId",derigeantId)
          if(derigeantId){
             
            derigeantId.club.push(saveclub._id as mongoose.Types.ObjectId)
            const savederigeant = await derigeantId.save()
            console.log(savederigeant) 
          }
         return newclub
        }

    //methode get
    async listeclub():Promise<IClub[]>{
      const listeclub=await this.clubModel.find()
      return listeclub
    }
    //methode delete
  async supprimerclub(chambid:string):Promise<IClub>{
    const deleteData=await this.clubModel.findByIdAndDelete(chambid)
    if(!deleteData){
      throw new NotFoundException(`club avec l'id ${chambid} est introuvable`)
    }
    const updatederigeant = await this.derigeantModel.findById(deleteData.derigentClub)
    if(updatederigeant){
      updatederigeant.club =updatederigeant.club.filter(chambId => chambId.toString()!== chambid)
      await updatederigeant.save()
    }else{
    throw new NotFoundException(`club #${chambid} est introuvable dans le derigeant`)}  
      return deleteData
  }

  //methode update
  async modifierclub(id:string,UpdateclubDto:UpdateClubDto):Promise<IClub>{
    const updateData=await this.clubModel.findByIdAndUpdate (id,UpdateclubDto,{new:true})
    if(!updateData){
      throw new NotFoundException(`club avec l'id ${id}, existe pas`);
    } 
    return updateData
    }
    //methode get by id
    async getbyid(id:string): Promise<IClub>{
      const getclub=await this.clubModel.findById(id).populate('evenement')
      if(!getclub){
        throw new NotFoundException(`club avec l'id ${id}, existe pas `)
      }
      return getclub
  }
}
