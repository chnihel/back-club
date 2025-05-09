import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get('club/:clubId')
async getMessagesByClub(@Param('clubId') clubId: string) {
  return this.messageService.getMessage({ sender: '', content: '', recepient: [], clubId });
}
}
