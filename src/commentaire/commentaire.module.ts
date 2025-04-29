import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { commentaireSchema } from './entities/commentaire.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"commentaire",schema:commentaireSchema}])],
  controllers: [CommentaireController],
  providers: [CommentaireService],
})
export class CommentaireModule {}
