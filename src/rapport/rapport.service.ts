import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRapportDto } from './dto/create-rapport.dto';
import { UpdateRapportDto } from './dto/update-rapport.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Irappport } from './interface/interface.rapport';
import { IClub } from 'src/club/interface/interface.club';

@Injectable()
export class RapportService {
  constructor(@InjectModel('rapport') private rapportModel: Model<Irappport>, @InjectModel('club') private clubModel: Model<IClub>) { }
  async ajouterRapport(createRapportEventDto: CreateRapportDto): Promise<Irappport> {
    const newrapport = await new this.rapportModel(createRapportEventDto)
    const saverapport = await newrapport.save() as Irappport
    const clubId = await this.clubModel.findById(createRapportEventDto.club)
    if (clubId) {
      clubId.rapport.push(saverapport._id as mongoose.Types.ObjectId)
      const savederigeant = await clubId.save()
      console.log(savederigeant)
    }
    return newrapport
  }

  async modifierrapport(id: string, UpdaterapportDto: UpdateRapportDto): Promise<Irappport> {
    const updateData = await this.rapportModel.findByIdAndUpdate(id, UpdaterapportDto, { new: true })
    if (!updateData) {
      throw new NotFoundException(`rapport avec l'id ${id}, existe pas`);
    }
    return updateData
  }

  async supprimerrapport(rapportId: string): Promise<any> {
    const rapport = await this.rapportModel.findById(rapportId);
    if (!rapport) {
      throw new NotFoundException(`rapport avec l'id ${rapportId} est introuvable`);
    }

    const updateClub = await this.clubModel.findById(rapport.club);
    if (updateClub) {
      updateClub.rapport = updateClub.rapport.filter(
        Idrapport => Idrapport.toString() !== rapportId);
      await updateClub.save();
    } else {
      console.warn(`Club non trouvé pour rapport #${rapportId}`);
    }

    const deleteData = await this.rapportModel.findByIdAndDelete(rapportId);
    return deleteData;
  }

}
