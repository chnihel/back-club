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
import { clubSchema } from 'src/club/entities/club.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'ressource',schema:ressourceSchema, discriminators: [
          { name: 'guide', schema:GuideSchema},
          { name: 'reglement', schema:reglementSchema},
          { name: 'tutoriel', schema:tutorielSchema},{name:'multimedia',schema:multimediaSchema}]},{name:'club',schema:clubSchema},{name:'user',schema:userSchema}]),NotificationModule,MailerModule],
 
  controllers: [RessourcesController],
  providers: [RessourcesService],
  exports:[RessourcesService]
})
export class RessourcesModule {}
