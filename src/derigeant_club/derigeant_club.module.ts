import { Module } from '@nestjs/common';
import { DerigeantClubService } from './derigeant_club.service';
import { DerigeantClubController } from './derigeant_club.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { derigeantSchema } from './entities/derigeant_club.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[MongooseModule.forFeature([{name:"user",schema:userSchema}]),UserModule],
  controllers: [DerigeantClubController],
  providers: [DerigeantClubService],
})
export class DerigeantClubModule {}
