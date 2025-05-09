
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
      const savedMessage = await this.messageService.saveMessage({...data,type:'club'});
      
      // Envoyer à tous les membres abonnés à ce club
      this.server.to(data.clubId).emit('newMessage', savedMessage);
      console.log('message envoyer',savedMessage)
      console.log('id de club',data.clubId)
    }

    //send private message
  @SubscribeMessage('sendPrivateMessage')
async handleSendPrivateMessage(@MessageBody() data: any) {
  const savedMessage = await this.messageService.savePrivateMessage({...data,type:"private"});

  // Envoyer uniquement à l'expéditeur et au destinataire
 this.server.to(data.sender).emit('privateMessageSent', savedMessage);
  this.server.to(data.recepientId).emit('newPrivateMessage', savedMessage);
   //const privateRoomId = this.getPrivateRoomId(data.sender, data.recepientId);
  
  // Envoyer uniquement à la room privée
 // this.server.to(privateRoomId).emit('newPrivateMessage', savedMessage);
  console.log('Message privé envoyé', savedMessage);
}

private getPrivateRoomId(user1: string, user2: string): string {
  // Créer un ID de room unique et cohérent peu importe l'ordre des users
  const ids = [user1, user2].sort();
  return `private_${ids[0]}_${ids[1]}`;
}
    @SubscribeMessage('requestHistory')
async handleRequestHistory(
  @MessageBody() clubId: string,
  @ConnectedSocket() client: Socket,
) {
  const history = await this.messageService.getMessagesByClub(clubId);
  client.emit('chatHistory', history);
}

@SubscribeMessage('requestPrivateHistory')
async handleRequestPrivateHistory(
  @MessageBody() data: { sender: string; recepientId: string },
  @ConnectedSocket() client: Socket,
) {
  const history = await this.messageService.getMessagesBetweenUsers(data.sender, data.recepientId);
  client.emit('privateChatHistory', history);
  console.log("privateChatHistory",history)
}

  
@SubscribeMessage('joinClub')
handleJoinClub(
  @MessageBody() data: { clubId: string },
  @ConnectedSocket() client: Socket, 
) {
  client.join(data.clubId);
}

@SubscribeMessage('joinUserRoom')
handleJoinUserRoom(
  @MessageBody() data: { userId: string },
  @ConnectedSocket() client: Socket,
) {
  client.join(data.userId); // Chaque utilisateur rejoint sa room personnelle
  console.log(`User ${data.userId} a rejoint sa room personnelle`);
}
  }
  