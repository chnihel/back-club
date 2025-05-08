import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembreDto } from './dto/create-membre.dto';
import { UpdateMembreDto } from './dto/update-membre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IMembre } from './interface/interface.membre';
import { UserService } from 'src/user/user.service';
import { IClub } from 'src/club/interface/interface.club';
import * as argon2 from 'argon2'
@Injectable()
export class MembreService {
 constructor(
     @InjectModel('user') private membreModel:Model<IMembre>,@InjectModel('club') private clubModel:Model<IClub>,@InjectModel('event') private eventModel:Model<IClub>,
     private readonly userService: UserService
   ) {}
    hashData(data:string){
      return argon2.hash(data)
   }
 
   async createmembre(createmembreDto: CreateMembreDto): Promise<any> {
    const hashedPassword=await this.hashData(createmembreDto.password)
     const newmembre = await new this.membreModel({...createmembreDto,password:hashedPassword});
     const savedmembre = await newmembre.save();
 
     const verificationmembre = await this.userService.sendVerificationEmail(
       savedmembre.id.toString(),
       savedmembre.email
     );
 
     await this.membreModel.findByIdAndUpdate(
       savedmembre._id,
       { code: verificationmembre.verificationCode },
       { new: true }
     );
 
     const updatedmembre = await this.membreModel.findById(savedmembre._id).lean();
 
     return { membre: updatedmembre };
   }

 
   // Méthode pour récupérer tous les membres -- findAll()
   async findAllmembre(): Promise<IMembre[]> {
     const listemembres = await this.membreModel.find().exec()
     return listemembres
   }
 
   // Méthode pour récupérer un membre par son ID -- findOne
   async findOnemembre(id: string): Promise<IMembre> {
     const membreID = await this.membreModel.findById(id).populate('eventId')
     if(!membreID) {
       throw new NotFoundException(`membre with ID ${id} is not found`)
     }
     return membreID
   }
   async updatemembre(id: string, updatemembreDto: UpdateMembreDto): Promise<IMembre> {
     const updatemembreID = await this.membreModel.findOneAndUpdate({_id:id,role:"membre"}, updatemembreDto, {new:true}).exec()
     if(!updatemembreID) {
       throw new NotFoundException(`membre with ID ${id} is not found`)
     }
     return updatemembreID
   }
 
   async deletemembre(id: string): Promise<IMembre> {
     const deletemembreID = await this.membreModel.findByIdAndDelete(id).exec()
     if(!deletemembreID) {
       throw new NotFoundException(`membre with ID ${id} is not found`)
     }
     return deletemembreID
   }

   async suivreClub(membreId: string, clubId: string): Promise<any> {
    const membre = await this.membreModel.findById(membreId);
    const club = await this.clubModel.findById(clubId);
    console.log('membreId reçu:', membreId);
    console.log('eventId reçu:', clubId);
    if (!membre || !club) {
      throw new NotFoundException('Membre ou Club introuvable');
    }


    const membreObjectId = new Types.ObjectId(membreId);
    const clubObjectId = new Types.ObjectId(clubId);

    if (club.membres.includes(membreObjectId)) {
      return { message: 'Le membre suit déjà ce club.' };
    }

    club.membres.push(membreObjectId);
    await club.save();
    membre.club.push(clubObjectId); 
    await membre.save();

    return { message: 'Club suivi avec succès.' };
  }

  async desuivreClub(membreId: string, clubId: string): Promise<any> {
    const membre = await this.membreModel.findById(membreId);
    const club = await this.clubModel.findById(clubId);
  
    if (!membre || !club) {
      throw new NotFoundException('Membre ou Club introuvable');
    }
  
    const membreObjectId = new Types.ObjectId(membreId);
    const clubObjectId = new Types.ObjectId(clubId);
  
    if (!club.membres.includes(membreObjectId)) {
      return { message: 'Le membre ne suit pas ce club.' };
    }
  
    // Retirer le membre du club
    club.membres = club.membres.filter(id => !id.equals(membreObjectId));
    await club.save();
  
    // Retirer le club du membre
    membre.club = membre.club.filter(id => !id.equals(clubObjectId));
    await membre.save();
  
    return { message: 'Club désuivi avec succès.' };
  }

  async suivreEvent(membreId: string, eventId: string): Promise<any> {
    const membre = await this.membreModel.findById(membreId);
    const event = await this.eventModel.findById(eventId);
    console.log('membreId reçu:', membreId);
    console.log('eventId reçu:', eventId);
    if (!membre || !event) {
      throw new NotFoundException('Membre ou event introuvable');
    }


    const membreObjectId = new Types.ObjectId(membreId);
    const eventObjectId = new Types.ObjectId(eventId);

    if (event.membres.includes(membreObjectId)) {
      return { message: 'Le membre suit déjà ce club.' };
    }

    event.membres.push(membreObjectId);
    await event.save();
    membre.event.push(eventObjectId); 
    await membre.save();

    return { message: 'Club suivi avec succès.' };
  }


  async saveFcmToken(sub: string, fcmToken: string) {
    console.log('Recherche avec:', { _id: sub, role: 'membre' });
    return this.membreModel.findOneAndUpdate({_id:sub,role:"membre"}, { fcmToken }, { new: true });
  }
//update Status (isPaid) for event
  async updatePaidMembre(membreId:string,eventId:string){

      const membre=await this.membreModel.findOneAndUpdate({_id:membreId,role:"membre","event.eventId":eventId},{$set:{'event.$.isPaid':true}},{new:true})
      if(!membre){
        throw new NotFoundException('membre not found for updated here status of paid')
      }
      return membre

      
     
  }
  async updatePaidMembreForClub(membreId:string,clubId:string){

    const membre=await this.membreModel.findOneAndUpdate({_id:membreId,role:"membre","club.clubId":clubId},{$set:{'club.$.isPaid':true}},{new:true})
    if(!membre){
      throw new NotFoundException('membre not found for updated here status of paid for club')
    }
    return membre

    
   
}
}
