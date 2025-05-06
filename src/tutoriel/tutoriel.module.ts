import { Module } from '@nestjs/common';
import { TutorielService } from './tutoriel.service';
import { TutorielController } from './tutoriel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { tutorielSchema } from './entities/tutoriel.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';
import { clubSchema } from 'src/club/entities/club.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'ressource',schema:ressourceSchema},{name:'club',schema:clubSchema}])],
  controllers: [TutorielController],
  providers: [TutorielService],
})
export class TutorielModule {}
