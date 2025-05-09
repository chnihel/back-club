// src/message/message.gateway.ts
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { MessageService } from './message.service';
  
  @WebSocketGateway({ cors: true })
  export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    constructor(private readonly messageService: MessageService) {}
  
    afterInit(server: Server) {
      console.log('Socket server initialized');
    }
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      @MessageBody() data: any,
    ) {
      const savedMessage = await this.messageService.saveMessage(data);
      
      // Envoyer à tous les membres abonnés à ce club
      this.server.to(data.clubId).emit('newMessage', savedMessage);
      console.log('message envoyer',savedMessage)
      console.log('id de club',data.clubId)
    }
    @SubscribeMessage('requestHistory')
async handleRequestHistory(
  @MessageBody() clubId: string,
  @ConnectedSocket() client: Socket,
) {
  const history = await this.messageService.getMessagesByClub(clubId);
  client.emit('chatHistory', history);
}
  
@SubscribeMessage('joinClub')
handleJoinClub(
  @MessageBody() data: { clubId: string },
  @ConnectedSocket() client: Socket, 
) {
  client.join(data.clubId);
}

  }
  