import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './entities/ticket.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"ticket",schema:TicketSchema}])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
