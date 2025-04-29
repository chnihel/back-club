import { Module } from '@nestjs/common';
import { MutimediaService } from './mutimedia.service';
import { MutimediaController } from './mutimedia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { multimediaSchema } from './entities/mutimedia.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'multimedia',schema:multimediaSchema},{name:'ressource',schema:ressourceSchema}])],
  controllers: [MutimediaController],
  providers: [MutimediaService],
})
export class MutimediaModule {}
