import { Module } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { EvenementController } from './evenement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { eventSchema } from './entities/evenement.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { clubSchema } from 'src/club/entities/club.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"event",schema:eventSchema},{name:"user",schema:userSchema},{name:"club",schema:clubSchema}])],
  controllers: [EvenementController],
  providers: [EvenementService],
})
export class EvenementModule {}
