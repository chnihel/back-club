import { Module } from '@nestjs/common';
import { TutorielService } from './tutoriel.service';
import { TutorielController } from './tutoriel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { tutorielSchema } from './entities/tutoriel.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'tutoriel',schema:tutorielSchema},{name:'ressource',schema:ressourceSchema}])],
  controllers: [TutorielController],
  providers: [TutorielService],
})
export class TutorielModule {}
