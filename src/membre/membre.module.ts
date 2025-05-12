import { Module } from '@nestjs/common';
import { MembreService } from './membre.service';
import { MembreController } from './membre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { membreSchema } from './entities/membre.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { clubSchema } from 'src/club/entities/club.entity';
import { eventSchema } from 'src/evenement/entities/evenement.entity';
import { commentaireSchema } from 'src/commentaire/entities/commentaire.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'user',schema:userSchema},{name:'club',schema:clubSchema},{name:'event',schema:eventSchema},{name:"commentaire",schema:commentaireSchema}]),UserModule],
  controllers: [MembreController],
  providers: [MembreService],
})
export class MembreModule {}
