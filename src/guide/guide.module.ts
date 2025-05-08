import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GuideSchema } from './entities/guide.entity';
import { ressourceSchema } from 'src/ressources/entities/ressource.entity';
import { clubSchema } from 'src/club/entities/club.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { RessourcesModule } from 'src/ressources/ressources.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'ressource',schema:ressourceSchema},{name:'club',schema:clubSchema}]),RessourcesModule],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
