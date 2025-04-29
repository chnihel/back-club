import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { clubSchema } from './entities/club.entity';
import { userSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'club',schema:clubSchema},{name:'user',schema:userSchema}])],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
