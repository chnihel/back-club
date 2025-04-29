import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GuideSchema } from './entities/guide.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'guide',schema:GuideSchema},{name:'ressource',schema:ressourceSchema}])],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
