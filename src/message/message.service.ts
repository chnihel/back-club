import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from './interface/interface.message';
import { IClub } from 'src/club/interface/interface.club';

@Injectable()
export class MessageService {
  constructor(@InjectModel('message') private messageModel:Model<IMessage>,@InjectModel('club') private clubModel:Model<IClub>){}
  async saveMessage(data: { sender: string; clubId: string; content: string}) {
    const recipients = await this.findClubFollowers(data.clubId); 
    const newMessage = new this.messageModel({
      sender: data.sender,
      recepient: recipients,
      content: data.content,
      clubId:data.clubId
    });
    const saved = await newMessage.save();

  // ⚠️ Ici on fait populate du sender pour renvoyer image, nom, prenom
  return await this.messageModel
    .findById(saved._id)
    .populate('sender', 'nom prenom image');
  }
  async savePrivateMessage(data: { sender: string; recepientId: string; content: string; type: string  }) {
  const newMessage = new this.messageModel({
    sender: data.sender,
    recepientId: data.recepientId, 
    content: data.content,
    type: data.type 

  });

  const saved = await newMessage.save();

  return await this.messageModel
    .findById(saved._id)
    .populate('sender', 'nom prenom image');
}
//  async savePricateMessage(data:{sender:string,})

 /*  async getMessage(data:{sender:string,content:string,recepient:string[],clubId: string}){
    const messages=await this.messageModel.find()
    const filterMessage=await messages.filter((m)=>m.clubId.toString()===data.clubId)
    return filterMessage
  } */

  async findClubFollowers(clubId: string){
    const club = await this.clubModel.findById(clubId).populate('membres');
    if(!club){
      throw new NotFoundException('club not found')
    }
    return club?.membres.map((u) => u._id);
  }
  async getMessagesByClub(clubId: string) {
    return this.messageModel.find({ clubId }).populate('sender', 'nom prenom image') .sort({ createdAt: 1 }).exec();
  }

 async getMessagesBetweenUsers(senderId: string, recepientId: string) {
  return this.messageModel.find({
    type:"private",
    $or: [
      { sender: senderId, recepientId: recepientId },
      { sender: recepientId, recepientId: senderId }
    ]
  })
  .populate('sender', 'nom prenom image')
  .sort({ createdAt: 1 })
  .exec();
}
}
