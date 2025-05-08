import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDerigeantClubDto } from './dto/create-derigeant_club.dto';
import { UpdateDerigeantClubDto } from './dto/update-derigeant_club.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Iderigeant } from './interface/interface.derigeant';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'

@Injectable()
export class DerigeantClubService {
  constructor(
    @InjectModel('user') private derigeantModel:Model<Iderigeant>,
    private readonly userService: UserService
  ) {}



   hashData(data:string){
    return argon2.hash(data)
  }
  async createderigeant(createderigeantDto: CreateDerigeantClubDto): Promise<Iderigeant> {
    const hashedPassword=await this.hashData(createderigeantDto.password)
    const newderigeant = await new this.derigeantModel({...createderigeantDto,password:hashedPassword,__t: 'derigeant_club',});
    const savedderigeant = await newderigeant.save();

    const verificationderigeant = await this.userService.sendVerificationEmail(
      savedderigeant.id.toString(),
      savedderigeant.email
    );

    await this.derigeantModel.findByIdAndUpdate(
      savedderigeant._id,
      { code: verificationderigeant.verificationCode },
      { new: true }
    );

    //const updatedderigeant = await this.derigeantModel.findById(savedderigeant._id).lean();

    return savedderigeant;
  }

  // Méthode pour récupérer tous les derigeants -- findAll()
  async findAllderigeant(): Promise<Iderigeant[]> {
    const listederigeants = await this.derigeantModel.find().exec()
    return listederigeants
  }

  // Méthode pour récupérer un derigeant par son ID -- findOne
  async findOnederigeant(id: string): Promise<Iderigeant> {
    const derigeantID = await this.derigeantModel.findById(id).populate('club').populate('evenement').exec()
    if(!derigeantID) {
      throw new NotFoundException(`derigeant with ID ${id} is not found`)
    }
    return derigeantID
  }
  async updatederigeant(id: string, updatederigeantDto: UpdateDerigeantClubDto): Promise<Iderigeant> {
    const updatederigeantID = await this.derigeantModel.findOneAndUpdate({_id:id,role:"derigeant_club"}, updatederigeantDto, {new:true}).exec()
    if(!updatederigeantID) {
      throw new NotFoundException(`derigeant with ID ${id} is not found`)
    }
    return updatederigeantID
  }

  async deletederigeant(id: string): Promise<Iderigeant> {
    const deletederigeantID = await this.derigeantModel.findByIdAndDelete(id).exec()
    if(!deletederigeantID) {
      throw new NotFoundException(`derigeant with ID ${id} is not found`)
    }
    return deletederigeantID
  }
}
