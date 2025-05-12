import { Module } from '@nestjs/common';
import { RapportService } from './rapport.service';
import { RapportController } from './rapport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { rapportSchema } from './entities/rapport.entity';
import { clubSchema } from 'src/club/entities/club.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"rapport",schema:rapportSchema},{name:"club",schema:clubSchema}])],
  controllers: [RapportController],
  providers: [RapportService],
})
export class RapportModule {}
