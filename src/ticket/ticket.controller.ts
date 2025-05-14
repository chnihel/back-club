import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './entities/ticket.entity';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService,@InjectModel('ticket') private ticketModel: Model<Ticket>) {}

  @Get('download/:id')
async downloadTicket(@Res() res, @Param('id') ticketId: string) {
  const ticket = await this.ticketModel.findById(ticketId);
  if(!ticket){
        return res.status(404).json({ message: 'Ticket not found' });

  }
  const path = await this.ticketService.generateTicketPDF(ticket);
  return res.download(path);
}
}
