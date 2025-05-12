import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto, MembreBureauDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { IClub, IMembreBureau } from './interface/interface.club';
import { Iderigeant } from 'src/derigeant_club/interface/interface.derigeant';
import { IMembre } from 'src/membre/interface/interface.membre';

@Injectable()
export class ClubService {
 
  constructor(
    @InjectModel("club") private clubModel:Model<IClub>,@InjectModel("user") private derigeantModel:Model<Iderigeant>,@InjectModel("user") private membreModel:Model<IMembre>) {}

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
      const listeclub=await this.clubModel.find().populate('derigentClub').populate({
        path: 'guide',
        populate: { path: 'club', select: 'nomClub' }  
      })
      .populate({
        path: 'reglement',
        populate: { path: 'club', select: 'nomClub' }  
      }).populate({
        path: 'multimedia',
        populate: { path: 'club', select: 'nomClub' } 
      }).populate({
        path: 'tutoriel',
        populate: { path: 'club', select: 'nomClub' }  
      })
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
      const getclub=await this.clubModel.findById(id).populate({
        path: 'evenement',
        populate: {
          path: 'membres',
        }
      }).populate('membres').populate('guide').populate('multimedia').populate('reglement').populate('tutoriel').populate('membres').populate('derigentClub').populate('rapport')
      if(!getclub){
        throw new NotFoundException(`club avec l'id ${id}, existe pas `)
      }
      return getclub
  }

  async ajouterMembreBureau(clubId: string, membreBureauDto: MembreBureauDto): Promise<IMembreBureau> {
    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException('Club introuvable');
    }
  
    club.membresBureau.push(membreBureauDto);
  
    await club.save();
  
    return membreBureauDto;
  }
  async updateMembreBureauById(clubId: string, membreId: string, membreBureauDto: MembreBureauDto): Promise<IMembreBureau> {
    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException('Club introuvable');
    }
  
    const membre = club.membresBureau.find(mb => mb._id && mb._id.toString() === membreId);
    if (!membre) {
      throw new NotFoundException('Membre du bureau introuvable');
    }
  
    if (membreBureauDto.nom !== undefined) membre.nom = membreBureauDto.nom;
if (membreBureauDto.role !== undefined) membre.role = membreBureauDto.role;
if (membreBureauDto.image !== undefined) membre.image = membreBureauDto.image;
  
    await club.save();
  
    return membre;
  }

  async updateStatusClub(id:string){
    const club=await this.clubModel.findByIdAndUpdate(id,{status:true},{new:true})
    if(!club){
      throw new NotFoundException(" club n'existe pas")
    }
    return club


  }


    //count membre qui suit un club specifique
async countNbreMembreSuivi(clubId: string) {
  try {
    const nbMembrePaid = await this.membreModel.countDocuments({
      role: "membre",
      club: {
        $elemMatch: {
          clubId: new Types.ObjectId(clubId),
          isPaid: true,
        },
      },
    });

    const club = await this.clubModel.findById(clubId).select("nomClub");

    return {
      count: nbMembrePaid,
      nomClub: club?.nomClub || "Nom inconnu",
    };
  } catch (error) {
    throw new Error("Erreur lors du comptage des membres");
  }
}


  
}
