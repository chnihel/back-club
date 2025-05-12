import { Module } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { clubSchema } from 'src/club/entities/club.entity';
import { paiementschema } from './entities/paiement.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { eventSchema } from 'src/evenement/entities/evenement.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [MongooseModule.forFeature
    ([{ name: "paiement", schema: paiementschema }, { name: "club", schema: clubSchema }, { name: "user", schema: userSchema },{ name: "event", schema: eventSchema }]),
      ScheduleModule.forRoot(),  // Assure-toi que le ScheduleModule est importé ici
],
  controllers: [PaiementController],
  providers: [PaiementService],
})
export class PaiementModule { }

