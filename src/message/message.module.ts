import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.entity';
import { clubSchema } from 'src/club/entities/club.entity';
import { MessageGateway } from './message.gateway';

@Module({
  imports:[MongooseModule.forFeature([{name:"message",schema:MessageSchema},{name:"club",schema:clubSchema}])],
  controllers: [MessageController],
  providers: [MessageService,MessageGateway],
})
export class MessageModule {}
