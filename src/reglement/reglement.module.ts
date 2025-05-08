import { Module } from '@nestjs/common';
import { ReglementService } from './reglement.service';
import { ReglementController } from './reglement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reglementSchema } from './entities/reglement.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';
import { clubSchema } from 'src/club/entities/club.entity';
import { RessourcesModule } from 'src/ressources/ressources.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'ressource',schema:ressourceSchema},{name:'club',schema:clubSchema}]),RessourcesModule],
  controllers: [ReglementController],
  providers: [ReglementService],
})
export class ReglementModule {}
