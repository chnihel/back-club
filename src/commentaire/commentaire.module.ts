import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { commentaireSchema } from './entities/commentaire.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';
import { userSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"commentaire",schema:commentaireSchema},{name:'ressource',schema:ressourceSchema},{name:'user',schema:userSchema}])],
  controllers: [CommentaireController],
  providers: [CommentaireService],
})
export class CommentaireModule {}
