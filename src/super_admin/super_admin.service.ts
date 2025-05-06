import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperAdminDto } from './dto/create-super_admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super_admin.dto';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from "argon2"
import { ISuper_Admin } from './interface/interface.superAdmin';

@Injectable()
export class SuperAdminService {
  constructor (@InjectModel("user") private adminModel:Model<IUser>){}
  //creation de admin pour une seul fois pour la sécurité

  async hasedData(data:string){
      return await argon2.hash(data)
  }
  async createadmin(CreateAdminDto: CreateSuperAdminDto) {
    if (!CreateAdminDto || !CreateAdminDto.password) {
      throw new BadRequestException('Données admin incomplètes');
    }
  
    const hashedPassword = await this.hasedData(CreateAdminDto.password);
  
    const existingAdmin = await this.adminModel.findOne({ role: "super_admin" });
  
    if (!existingAdmin) {
      const newadmin = new this.adminModel({
        ...CreateAdminDto,
        password: hashedPassword,
      });
      return newadmin.save();
    }
  
    console.log("l'admin est déjà existant");
    throw new BadRequestException('Vous ne pouvez pas ajouter un autre administrateur');
  }

  async updatesuperAdmin(id: string, updatesuperAdminDto: UpdateSuperAdminDto): Promise<any> {
      const updatesuperAdminID = await this.adminModel.findOneAndUpdate({_id:id,role:"super_admin"}, updatesuperAdminDto, {new:true}).exec()
      if(!updatesuperAdminID) {
        throw new NotFoundException(`superAdmin with ID ${id} is not found`)
      }
      return updatesuperAdminID
    }
  
}
