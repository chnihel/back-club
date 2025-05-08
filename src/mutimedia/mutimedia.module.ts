import { Module } from '@nestjs/common';
import { MutimediaService } from './mutimedia.service';
import { MutimediaController } from './mutimedia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { multimediaSchema } from './entities/mutimedia.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';
import { clubSchema } from 'src/club/entities/club.entity';
import { RessourcesModule } from 'src/ressources/ressources.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'ressource',schema:ressourceSchema},{name:'club',schema:clubSchema}]),RessourcesModule],
  controllers: [MutimediaController],
  providers: [MutimediaService],
})
export class MutimediaModule {}
