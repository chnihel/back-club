import { Module } from '@nestjs/common';
import { ReglementService } from './reglement.service';
import { ReglementController } from './reglement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reglementSchema } from './entities/reglement.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'reglement',schema:reglementSchema},{name:'ressource',schema:ressourceSchema}])],
  controllers: [ReglementController],
  providers: [ReglementService],
})
export class ReglementModule {}
