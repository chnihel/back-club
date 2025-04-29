import { Module } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { RessourcesController } from './ressources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ressourceSchema } from './entities/ressource.entity';
import { userSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'ressource',schema:ressourceSchema},{name:'user',schema:userSchema}])],
  controllers: [RessourcesController],
  providers: [RessourcesService],
})
export class RessourcesModule {}
