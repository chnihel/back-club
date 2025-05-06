import { Module } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { RessourcesController } from './ressources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ressourceSchema } from './entities/ressource.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { GuideSchema } from 'src/guide/entities/guide.entity';
import { reglementSchema } from 'src/reglement/entities/reglement.entity';
import { tutorielSchema } from 'src/tutoriel/entities/tutoriel.entity';
import { multimediaSchema } from 'src/mutimedia/entities/mutimedia.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'ressource',schema:ressourceSchema, discriminators: [
          { name: 'guide', schema:GuideSchema},
          { name: 'reglement', schema:reglementSchema},
          { name: 'tutoriel', schema:tutorielSchema},{name:'multimedia',schema:multimediaSchema}]}])],
 
  controllers: [RessourcesController],
  providers: [RessourcesService],
})
export class RessourcesModule {}
